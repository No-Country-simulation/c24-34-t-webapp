import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { JwtTokenType } from "@/common/enums/enums";
import { FindUserRoutinesDto } from "@/modules/users/dto/dto";
import { UserService } from "@/modules/users/user.service";

import { UserAuthResponse, UserSignInDto, UserSignUpDto } from "./dto/dto";

@Injectable()
class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async verifyToken(id: string): Promise<FindUserRoutinesDto> {
    const userDto = await this.userService.findById(id);
    return { ...userDto };
  }

  async signIn({
    userData,
  }: {
    userData: UserSignInDto;
  }): Promise<UserAuthResponse> {
    const user = await this.userService.comparePassword(userData);
    const userDto = await this.userService.findById(user.id);

    const accessToken = await this.jwtService.signAsync({
      email: user.email,
      type: JwtTokenType.ACCESS,
    });

    return { ...userDto, accessToken };
  }

  async signUp({
    userData,
  }: {
    userData: UserSignUpDto;
  }): Promise<UserAuthResponse> {
    const user = await this.userService.createUser({ userData });
    const userDto = await this.userService.findById(user.id);

    const accessToken = await this.jwtService.signAsync({
      email: user.email,
      type: JwtTokenType.ACCESS,
    });

    return { ...userDto, accessToken };
  }
}

export { AuthService };
