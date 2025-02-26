import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DbService } from "@/database/db.service";

import { CreateRoutineDto, FindAllRoutinesDto } from "./dto/dto";
import { Routine } from "./types/routines.types";

@Injectable()
class RoutineService {
  constructor(private dbService: DbService) {}

  async findAll(): Promise<FindAllRoutinesDto[]> {
    const routines = await this.dbService.routine.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        userId: true,
        activities: {
          select: {
            id: true,
            title: true,
            description: true,
            time: true,
            timeRange: true,
            goals: {
              select: {
                id: true,
                unit: true,
                period: true,
                value: true,
              },
            },
            subcategory: {
              select: {
                id: true,
                name: true,
                category: true,
              },
            },
          },
        },
      },
    });

    const routinesDto = routines.map(routine => {
      const activitiesDto = routine.activities.map(activity => {
        return {
          id: activity.id,
          title: activity.title,
          description: activity.description,
          time: activity.time,
          timeRange: activity.timeRange,
          category: activity.subcategory.category.name,
          subcategory: activity.subcategory.name,
          goal: {
            id: activity.goals[0]?.id,
            unit: activity.goals[0]?.unit.name,
            period: activity.goals[0]?.period,
            value: activity.goals[0]?.value,
          },
        };
      });

      return {
        id: routine.id,
        title: routine.title,
        description: routine.description,
        userId: routine.userId,
        activities: activitiesDto,
      };
    });

    return routinesDto;
  }

  async create(routine: CreateRoutineDto): Promise<FindAllRoutinesDto> {
    let user;
    if (!routine.userId) {
      user = await this.dbService.user.findFirst();
    }
    if (routine.userId) {
      user = await this.dbService.user.findUnique({
        where: {
          id: routine.userId,
        },
      });
    }

    if (!user) {
      throw new NotFoundException("User not found");
    }

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
              timeRange: activity.timeRange,
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
      select: {
        id: true,
        title: true,
        description: true,
        userId: true,
        activities: {
          select: {
            id: true,
            title: true,
            description: true,
            time: true,
            timeRange: true,
            goals: {
              select: {
                id: true,
                unit: true,
                period: true,
                value: true,
              },
            },
            subcategory: {
              select: {
                id: true,
                name: true,
                category: true,
              },
            },
          },
        },
      },
    });

    const activitiesDto = newRoutine.activities.map(activity => {
      return {
        id: activity.id,
        title: activity.title,
        description: activity.description,
        time: activity.time,
        timeRange: activity.timeRange,
        category: activity.subcategory.category.name,
        subcategory: activity.subcategory.name,
        goal: {
          id: activity.goals[0]?.id,
          unit: activity.goals[0]?.unit.name,
          period: activity.goals[0]?.period,
          value: activity.goals[0]?.value,
        },
      };
    });

    return {
      id: newRoutine.id,
      title: newRoutine.title,
      description: newRoutine.description,
      userId: newRoutine.userId,
      activities: activitiesDto,
    };
  }

  async delete(id: string) {
    const routine = await this.dbService.routine.findUnique({ where: { id } });
    if (!routine) {
      throw new BadRequestException("Routine not found");
    }
    await this.dbService.routine.delete({ where: { id } });
  }

  async findRandom({
    subcategory,
    keyword,
    category,
  }: {
    subcategory: string | undefined;
    keyword: string | undefined;
    category: string | undefined;
  }): Promise<FindAllRoutinesDto> {
    let routines: Routine[] = [];

    if (!subcategory && !keyword && !category) {
      routines = await this.dbService.routine.findMany({
        take: 30,
        select: {
          id: true,
          title: true,
          description: true,
          userId: true,
          activities: {
            select: {
              id: true,
              title: true,
              description: true,
              time: true,
              timeRange: true,
              goals: {
                select: {
                  id: true,
                  unit: true,
                  period: true,
                  value: true,
                },
              },
              subcategory: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                },
              },
            },
          },
        },
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
        select: {
          id: true,
          title: true,
          description: true,
          userId: true,
          activities: {
            select: {
              id: true,
              title: true,
              description: true,
              time: true,
              timeRange: true,
              goals: {
                select: {
                  id: true,
                  unit: true,
                  period: true,
                  value: true,
                },
              },
              subcategory: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                },
              },
            },
          },
        },
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
        select: {
          id: true,
          title: true,
          description: true,
          userId: true,
          activities: {
            select: {
              id: true,
              title: true,
              description: true,
              time: true,
              timeRange: true,
              goals: {
                select: {
                  id: true,
                  unit: true,
                  period: true,
                  value: true,
                },
              },
              subcategory: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                },
              },
            },
          },
        },
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
        select: {
          id: true,
          title: true,
          description: true,
          userId: true,
          activities: {
            select: {
              id: true,
              title: true,
              description: true,
              time: true,
              timeRange: true,
              goals: {
                select: {
                  id: true,
                  unit: true,
                  period: true,
                  value: true,
                },
              },
              subcategory: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                },
              },
            },
          },
        },
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
        select: {
          id: true,
          title: true,
          description: true,
          userId: true,
          activities: {
            select: {
              id: true,
              title: true,
              description: true,
              time: true,
              timeRange: true,
              goals: {
                select: {
                  id: true,
                  unit: true,
                  period: true,
                  value: true,
                },
              },
              subcategory: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                },
              },
            },
          },
        },
      });
    }

    if (routines.length === 0) {
      throw new NotFoundException("No routines found");
    }

    const randomIndex = Math.floor(Math.random() * routines.length);
    const randomRoutine = routines[randomIndex];

    const activitiesDto = randomRoutine.activities.map(activity => {
      return {
        id: activity.id,
        title: activity.title,
        description: activity.description,
        time: activity.time,
        timeRange: activity.timeRange,
        category: activity.subcategory.category.name,
        subcategory: activity.subcategory.name,
        goal: {
          id: activity.goals[0]?.id,
          unit: activity.goals[0]?.unit.name,
          period: activity.goals[0]?.period,
          value: activity.goals[0]?.value,
        },
      };
    });

    return {
      id: randomRoutine.id,
      title: randomRoutine.title,
      description: randomRoutine.description,
      userId: randomRoutine.userId,
      activities: activitiesDto,
    };
  }
}

export { RoutineService };
