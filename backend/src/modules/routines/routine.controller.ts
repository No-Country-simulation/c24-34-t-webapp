import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
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

  @Delete(":id")
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    if (!id) {
      throw new BadRequestException("Routine not found");
    }
    await this.routineService.delete(id);
  }
}
