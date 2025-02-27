import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { FindUserRoutinesDto } from "@/modules/users/dto/find-user-routines.dto";

class UserAuthResponse extends FindUserRoutinesDto {
  @ApiProperty()
  @IsString()
  accessToken!: string;
}

export { UserAuthResponse };
