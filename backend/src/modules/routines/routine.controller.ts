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
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "@/src/common/guards/guards";
import { type AuthTokenRequest } from "@/src/common/types/types";

import { CreateRoutineDto, FindAllRoutinesDto } from "./dto/dto";
import { RoutineService } from "./routine.service";

@ApiTags("routines")
@ApiBearerAuth("JWT-auth")
@UseGuards(AuthGuard)
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
  create(@Body() data: CreateRoutineDto, @Request() req: AuthTokenRequest) {
    const user = req.user;
    return this.routineService.create({ routine: data, user });
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete routine by id" })
  @HttpCode(204)
  async delete(@Param("id") id: string, @Request() req: AuthTokenRequest) {
    if (!id) {
      throw new BadRequestException("Routine not found");
    }
    const user = req.user;
    await this.routineService.delete({ id, user });
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
    @Request() req: AuthTokenRequest,
  ) {
    const user = req.user;
    return this.routineService.findRandom({
      user,
      subcategory,
      keyword,
      category,
    });
  }
}
