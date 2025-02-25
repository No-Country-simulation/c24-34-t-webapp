import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { UserDto } from "./dto/dto";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get(":id")
  @ApiOperation({ summary: "Find user by id" })
  @ApiOkResponse({ type: UserDto, isArray: false })
  findById(@Param("id") id: string) {
    if (!id) {
      throw new BadRequestException("User not found");
    }
    return this.userService.findById(id);
  }
}
