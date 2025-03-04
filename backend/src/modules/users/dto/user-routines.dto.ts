import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { FindAllRoutinesDto } from "../../routines/dto/find-all.dto";
import { UserDto } from "./user.dto";

class UserRoutinesDto extends UserDto {
  @ApiProperty({ type: () => [FindAllRoutinesDto] })
  @ValidateNested({ each: true })
  @Type(() => FindAllRoutinesDto)
  routines!: FindAllRoutinesDto[];
}

export { UserRoutinesDto };
