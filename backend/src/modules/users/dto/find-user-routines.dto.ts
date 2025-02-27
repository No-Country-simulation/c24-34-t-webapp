import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { FindAllRoutinesDto } from "@/modules/routines/dto/find-all.dto";

import { UserDto } from "./user.dto";
class FindUserRoutinesDto extends UserDto {
  @ApiProperty({ type: () => [FindAllRoutinesDto] })
  @ValidateNested({ each: true })
  @Type(() => FindAllRoutinesDto)
  routines!: FindAllRoutinesDto[];
}

export { FindUserRoutinesDto };
