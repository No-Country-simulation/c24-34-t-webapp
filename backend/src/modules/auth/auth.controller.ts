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
import { type AuthTokenRequest } from "@/common/types/types";
import { FindUserRoutinesDto } from "@/modules/users/dto/find-user-routines.dto";

import { AuthService } from "./auth.service";
import { UserAuthResponse, UserSignInDto, UserSignUpDto } from "./dto/dto";

@ApiTags("auth")
@Controller("auth")
class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth("JWT-auth")
  @Get("verify-token")
  @ApiOperation({ summary: "Verify access token" })
  @ApiOkResponse({ type: FindUserRoutinesDto, isArray: false })
  verifyToken(@Request() req: AuthTokenRequest) {
    const user = req.user;
    return this.authService.verifyToken(user.id);
  }

  @Post("sign-up")
  @ApiOperation({ summary: "User Sign Up" })
  @ApiOkResponse({ type: UserAuthResponse, isArray: false })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signUp(@Body() userData: UserSignUpDto) {
    return this.authService.signUp({
      userData,
    });
  }

  @Post("sign-in")
  @ApiOperation({ summary: "User Sign In" })
  @ApiOkResponse({ type: UserAuthResponse, isArray: false })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  signIn(@Body() userData: UserSignInDto) {
    return this.authService.signIn({ userData });
  }
}

export { AuthController };
