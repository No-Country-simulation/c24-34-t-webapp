import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { UserDto } from "./dto/dto";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get(":email")
  @ApiOperation({ summary: "Find user by email" })
  @ApiOkResponse({ type: UserDto, isArray: false })
  findByEmail(@Param("email") email: string) {
    if (!email) {
      throw new BadRequestException("User not found");
    }
    return this.userService.findByEmail(email);
  }
}
