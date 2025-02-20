import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsUUID } from "class-validator";

import { Period } from "../enums/enums";
import { type Period as PeriodType } from "../types/types";

class GoalDto {
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty({ enum: Period })
  @IsEnum(Period)
  period!: PeriodType;

  @ApiProperty()
  @IsInt()
  value!: number;

  @ApiProperty()
  @IsUUID()
  unitId!: string;

  @ApiProperty()
  @IsUUID()
  activityId!: string;
}

export { GoalDto };
