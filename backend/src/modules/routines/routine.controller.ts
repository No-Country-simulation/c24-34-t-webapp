import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { CreateRoutineDto, FindAllRoutinesDto } from "./dto/dto";
import { RoutineService } from "./routine.service";

@ApiTags("routines")
@Controller("routines")
export class RoutineController {
  constructor(private routineService: RoutineService) {}

  @Get("")
  @ApiOperation({ summary: "Find all routines" })
  @ApiOkResponse({ type: FindAllRoutinesDto, isArray: true })
  findAll() {
    return this.routineService.findAll();
  }

  @Post("")
  @ApiOperation({ summary: "Create new routine" })
  @ApiOkResponse({ type: FindAllRoutinesDto, isArray: false })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() data: CreateRoutineDto) {
    return this.routineService.create(data);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete routine by id" })
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    if (!id) {
      throw new BadRequestException("Routine not found");
    }
    await this.routineService.delete(id);
  }

  @Get("random")
  @ApiOperation({ summary: "Get random routine" })
  @ApiOkResponse({ type: FindAllRoutinesDto, isArray: false })
  async findRandom(@Query("subcategory") subcategory: string) {
    return this.routineService.findRandom({ subcategory });
  }
}
