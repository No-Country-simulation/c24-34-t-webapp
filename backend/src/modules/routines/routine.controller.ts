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
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";

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
    if (!data.userId) {
      throw new BadRequestException("User not found");
    }

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
  @ApiQuery({
    name: "keyword",
    required: false,
    type: String,
    description: "Filter by keyword",
  })
  @ApiQuery({
    name: "category",
    required: false,
    type: String,
    description: "Filter by category",
  })
  @ApiQuery({
    name: "subcategory",
    required: false,
    type: String,
    description: "Filter by subcategory",
  })
  @ApiOperation({ summary: "Get random routine" })
  @ApiOkResponse({ type: FindAllRoutinesDto, isArray: false })
  async findRandom(
    @Query("keyword") keyword: string | undefined,
    @Query("category") category: string | undefined,
    @Query("subcategory") subcategory: string | undefined,
  ) {
    return this.routineService.findRandom({ subcategory, keyword, category });
  }
}
