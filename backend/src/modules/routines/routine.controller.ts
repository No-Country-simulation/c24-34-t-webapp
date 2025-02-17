import { Controller, Get } from "@nestjs/common";

import { RoutineService } from "./routine.service";

@Controller("routines")
export class RoutineController {
  constructor(private routineService: RoutineService) {}

  @Get("")
  getUsers() {
    return this.routineService.findAll();
  }
}
