import { Injectable } from "@nestjs/common";

import { DbService } from "@/database/db.service";

@Injectable()
class RoutineService {
  constructor(private dbService: DbService) {}

  async findAll() {
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
            goals: true,
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

    return routines;
  }
}

export { RoutineService };
