import { IsEnum, IsInt, IsUUID } from "class-validator";

import { Period } from "../enums/enums";
import { Period as PeriodType } from "../types/types";

class GoalDto {
  @IsUUID()
  id!: string;

  @IsEnum(Period)
  period!: PeriodType;

  @IsInt()
  value!: number;

  @IsUUID()
  unitId!: string;

  @IsUUID()
  activityId!: string;
}

export { GoalDto };
