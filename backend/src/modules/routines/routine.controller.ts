import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { CreateRoutineDto } from "./dto/dto";
import { RoutineService } from "./routine.service";

@Controller("routines")
export class RoutineController {
  constructor(private routineService: RoutineService) {}

  @Get("")
  getUsers() {
    return this.routineService.findAll();
  }

  @Post("")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() data: CreateRoutineDto) {
    return this.routineService.create(data);
  }
}
