import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

import { ROUTINE_SELECT } from "@/common/constants/constants";
import { mapToRoutineDto } from "@/common/helpers/helpers";
import { DbService } from "@/database/db.service";

import { UserDto } from "../users/dto/dto";
import { CreateRoutineDto, FindAllRoutinesDto } from "./dto/dto";
import { Routine } from "./types/routines.types";

@Injectable()
class RoutineService {
  constructor(private dbService: DbService) {}

  async findAll(): Promise<FindAllRoutinesDto[]> {
    const routines = await this.dbService.routine.findMany({
      select: ROUTINE_SELECT,
    });

    const routinesDto = routines.map(routine => {
      return mapToRoutineDto(routine);
    });

    return routinesDto;
  }

  async findById(id: string): Promise<FindAllRoutinesDto | undefined> {
    const routine = await this.dbService.routine.findUnique({
      where: { id: id },
      select: ROUTINE_SELECT,
    });
    if (!routine) {
      return undefined;
    }

    return mapToRoutineDto(routine);
  }

  async findByUserId(userId: string): Promise<FindAllRoutinesDto[]> {
    const routines = await this.dbService.routine.findMany({
      where: { userId: userId },
      select: ROUTINE_SELECT,
    });
    if (routines.length === 0) {
      return [];
    }

    return routines.map(routine => mapToRoutineDto(routine));
  }

  async create({
    routine,
    user,
  }: {
    routine: CreateRoutineDto;
    user: UserDto;
  }): Promise<FindAllRoutinesDto> {
    await Promise.all(
      routine.activities.map(async (activity, index) => {
        const category = await this.dbService.category.findFirst({
          where: {
            name: activity.category,
          },
          select: {
            name: true,
            subcategories: true,
          },
        });

        if (!category) {
          throw new NotFoundException(`activities.${index}.category not found`);
        }

        const subcategory = category.subcategories.find(subcategory => {
          return subcategory.name === activity.subcategory;
        });

        if (!subcategory) {
          throw new NotFoundException(
            `activities.${index}.subcategory not found in this category`,
          );
        }

        const unit = await this.dbService.unit.findFirst({
          where: {
            name: activity.goal.unit,
          },
        });

        if (!unit) {
          throw new NotFoundException(`activities.${index}.unit not found`);
        }
      }),
    );

    const newRoutine = await this.dbService.routine.create({
      data: {
        title: routine.title,
        description: routine.description,
        userId: user.id,
        activities: {
          create: routine.activities.map(activity => {
            return {
              title: activity.title,
              description: activity.description,
              time: activity.time,
              subcategory: {
                connect: {
                  name: activity.subcategory,
                },
              },
              goals: {
                create: {
                  unit: {
                    connect: {
                      name: activity.goal.unit,
                    },
                  },
                  period: activity.goal.period,
                  value: activity.goal.value,
                },
              },
            };
          }),
        },
      },
      select: ROUTINE_SELECT,
    });

    await this.dbService.user.update({
      where: { id: user.id },
      data: { assignedRoutine: newRoutine.id },
    });

    return mapToRoutineDto(newRoutine);
  }

  async delete({ id, user }: { id: string; user: UserDto }): Promise<void> {
    const routine = await this.dbService.routine.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!routine) {
      throw new BadRequestException("Routine not found");
    }

    if (routine.userId !== user.id) {
      throw new UnauthorizedException("Unauthorized user");
    }

    await this.dbService.routine.delete({ where: { id } });
  }

  async findRandom({
    user,
    subcategory,
    keyword,
    category,
  }: {
    user: UserDto;
    subcategory: string | undefined;
    keyword: string | undefined;
    category: string | undefined;
  }): Promise<FindAllRoutinesDto> {
    let routines: Routine[] = [];

    if (!subcategory && !keyword && !category) {
      routines = await this.dbService.routine.findMany({
        take: 30,
        select: ROUTINE_SELECT,
      });
    }

    if (subcategory && !category) {
      const subcategoryExists = await this.dbService.subcategory.findFirst({
        where: {
          name: subcategory,
        },
      });

      if (!subcategoryExists) {
        throw new NotFoundException("Subcategory not found");
      }

      routines = await this.dbService.routine.findMany({
        where: {
          activities: {
            some: {
              subcategory: {
                name: subcategory,
              },
            },
          },
        },
        select: ROUTINE_SELECT,
      });
    }

    if (category && !subcategory) {
      const categoryExists = await this.dbService.category.findFirst({
        where: {
          name: category,
        },
      });

      if (!categoryExists) {
        throw new NotFoundException("Category not found");
      }

      routines = await this.dbService.routine.findMany({
        where: {
          activities: {
            some: {
              subcategory: {
                category: { name: category },
              },
            },
          },
        },
        select: ROUTINE_SELECT,
      });
    }

    if (category && subcategory) {
      const categoryExists = await this.dbService.category.findFirst({
        where: {
          name: category,
        },
      });

      if (!categoryExists) {
        throw new NotFoundException("Category not found");
      }

      const subcategoryExists = await this.dbService.subcategory.findFirst({
        where: {
          name: subcategory,
        },
      });

      if (!subcategoryExists) {
        throw new NotFoundException("Subcategory not found");
      }

      routines = await this.dbService.routine.findMany({
        where: {
          activities: {
            some: {
              OR: [
                {
                  subcategory: {
                    category: { name: category },
                  },
                },
                {
                  subcategory: {
                    name: subcategory,
                  },
                },
              ],
            },
          },
        },
        select: ROUTINE_SELECT,
      });
    }

    if (keyword && routines.length > 0) {
      const lowerKeyword = keyword.toLowerCase();

      routines = routines.filter(routine => {
        return (
          routine.title.toLowerCase().includes(lowerKeyword) ||
          routine.description.toLowerCase().includes(lowerKeyword) ||
          routine.activities.some(activity => {
            return (
              activity.title.toLowerCase().includes(lowerKeyword) ||
              activity.description.toLowerCase().includes(lowerKeyword)
            );
          })
        );
      });
    }

    if (keyword && !subcategory && !category) {
      routines = await this.dbService.routine.findMany({
        where: {
          OR: [
            {
              title: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              activities: {
                some: {
                  title: {
                    contains: keyword,
                    mode: "insensitive",
                  },
                  description: {
                    contains: keyword,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        },
        select: ROUTINE_SELECT,
      });
    }

    if (routines.length === 0) {
      throw new NotFoundException("No routines found");
    }

    const randomIndex = Math.floor(Math.random() * routines.length);
    const randomRoutine = routines[randomIndex];

    await this.dbService.user.update({
      where: { id: user.id },
      data: { assignedRoutine: randomRoutine.id },
    });

    return mapToRoutineDto(randomRoutine);
  }
}

export { RoutineService };
