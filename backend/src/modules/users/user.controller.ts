import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { routinesToSet } from "@/common/helpers/helpers";
import { RoutineService } from "@/modules/routines/routine.service";

import { UserRoutinesDto } from "./dto/dto";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(
    private userService: UserService,
    private routineService: RoutineService,
  ) {}

  @Get("email/:email")
  @ApiOperation({ summary: "Find user by email and retrieve linked routines" })
  @ApiOkResponse({ type: UserRoutinesDto, isArray: false })
  async findByEmail(@Param("email") email: string) {
    if (!email) {
      throw new BadRequestException("User not found");
    }
    const user = await this.userService.findByEmail(email);
    let routines = await this.routineService.findByUserId(user.id);
    if (user.assignedRoutine) {
      const assignedRoutine = await this.routineService.findById(
        user.assignedRoutine,
      );
      if (assignedRoutine) {
        routines = [...routines, assignedRoutine];
      }
      routines = [...routines];
    }
    return { ...user, routines: routinesToSet(routines) };
  }

  @Get(":id")
  @ApiOperation({ summary: "Find a user by id and retrieve linked routines" })
  @ApiOkResponse({ type: UserRoutinesDto, isArray: false })
  async findById(@Param("id") id: string) {
    if (!id) {
      throw new BadRequestException("User not found");
    }
    const user = await this.userService.findById(id);
    let routines = await this.routineService.findByUserId(user.id);
    if (user.assignedRoutine) {
      const assignedRoutine = await this.routineService.findById(
        user.assignedRoutine,
      );
      if (assignedRoutine) {
        routines = [...routines, assignedRoutine];
      }
      routines = [...routines];
    }
    return { ...user, routines: routinesToSet(routines) };
  }
}
