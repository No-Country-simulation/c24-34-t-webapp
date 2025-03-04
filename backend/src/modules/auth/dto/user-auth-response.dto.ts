import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { UserRoutinesDto } from "@/modules/users/dto/user-routines.dto";

class UserAuthResponse extends UserRoutinesDto {
  @ApiProperty()
  @IsString()
  accessToken!: string;
}

export { UserAuthResponse };
