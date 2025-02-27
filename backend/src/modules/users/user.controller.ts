import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { FindUserRoutinesDto } from "./dto/dto";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("email/:email")
  @ApiOperation({ summary: "Find user by email" })
  @ApiOkResponse({ type: FindUserRoutinesDto, isArray: false })
  async findByEmail(@Param("email") email: string) {
    if (!email) {
      throw new BadRequestException("User not found");
    }
    const user = await this.userService.findByEmail(email);
    return this.userService.findById(user.id);
  }

  @Get(":id")
  @ApiOperation({ summary: "Find a user by id and retrieve linked routines" })
  @ApiOkResponse({ type: FindUserRoutinesDto, isArray: false })
  findById(@Param("id") id: string) {
    if (!id) {
      throw new BadRequestException("User not found");
    }
    return this.userService.findById(id);
  }
}
