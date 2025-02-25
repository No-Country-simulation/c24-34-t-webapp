import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { UserDto } from "@/modules/users/dto/user.dto";

class UserAuthResponse extends UserDto {
  @ApiProperty()
  @IsString()
  accessToken!: string;
}

export { UserAuthResponse };
