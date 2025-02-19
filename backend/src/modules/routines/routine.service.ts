import { Injectable } from "@nestjs/common";

import { DbService } from "@/database/db.service";

import { FindAllRoutinesDto } from "./dto/find-all.dto";

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
}

export { RoutineService };
