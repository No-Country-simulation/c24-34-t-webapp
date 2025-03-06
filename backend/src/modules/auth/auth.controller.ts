import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "@/common/guards/guards";
import { routinesToSet } from "@/common/helpers/helpers";
import { type AuthTokenRequest } from "@/common/types/types";
import { RoutineService } from "@/modules/routines/routine.service";
import { UserRoutinesDto } from "@/modules/users/dto/dto";

import { AuthService } from "./auth.service";
import { UserAuthResponse, UserSignInDto, UserSignUpDto } from "./dto/dto";

@ApiTags("auth")
@Controller("auth")
class AuthController {
  constructor(
    private authService: AuthService,
    private routineService: RoutineService,
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth("JWT-auth")
  @Get("verify-token")
  @ApiOperation({ summary: "Verify access token" })
  @ApiOkResponse({ type: UserRoutinesDto, isArray: false })
  async verifyToken(@Request() req: AuthTokenRequest) {
    const user = req.user;
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

  @Post("sign-up")
  @ApiOperation({ summary: "User Sign Up" })
  @ApiOkResponse({ type: UserAuthResponse, isArray: false })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signUp(@Body() userData: UserSignUpDto) {
    const user = await this.authService.signUp({
      userData,
    });
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

  @Post("sign-in")
  @ApiOperation({ summary: "User Sign In" })
  @ApiOkResponse({ type: UserAuthResponse, isArray: false })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signIn(@Body() userData: UserSignInDto) {
    const user = await this.authService.signIn({ userData });
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

export { AuthController };
