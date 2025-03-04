import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsUUID, Min } from "class-validator";

import { Period } from "@/common/enums/enums";
import { type Period as PeriodType } from "@/common/types/types";

class GoalDto {
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty({ enum: Period })
  @IsEnum(Period)
  period!: PeriodType;

  @ApiProperty()
  @IsInt()
  @Min(0)
  value!: number;

  @ApiProperty()
  @IsUUID()
  unitId!: string;

  @ApiProperty()
  @IsUUID()
  activityId!: string;
}

export { GoalDto };
