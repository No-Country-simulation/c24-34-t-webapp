import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DbService } from "@/database/db.service";

import { CreateRoutineDto, FindAllRoutinesDto } from "./dto/dto";

@Injectable()
class RoutineService {
  constructor(private dbService: DbService) {}

  async findAll(): Promise<FindAllRoutinesDto[]> {
    const routines = await this.dbService.routine.findMany({
      select: {
        id: true,
        title: true,
        description: true,
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
        activities: activitiesDto,
      };
    });

    return routinesDto;
  }

  async create(routine: CreateRoutineDto): Promise<FindAllRoutinesDto> {
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
}

export { RoutineService };
