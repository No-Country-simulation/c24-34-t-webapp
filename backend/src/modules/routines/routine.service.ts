import { Injectable } from "@nestjs/common";

@Injectable()
class RoutineService {
  findAll() {
    return [
      {
        id: 1,
        name: "Morning Routine",
        description: "A routine to start the day",
      },
      {
        id: 2,
        name: "Evening Routine",
        description: "A routine to end the day",
      },
    ];
  }
}

export { RoutineService };
