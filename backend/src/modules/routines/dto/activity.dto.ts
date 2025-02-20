import { IsEnum, IsString, IsUUID, Length } from "class-validator";

import { TimeRange } from "@/modules/routines/enums/enums";
import { type TimeRange as TimeRangeType } from "@/modules/routines/types/types";

class ActivityDto {
  @IsUUID()
  id!: string;

  @IsString({ message: "Please enter a valid name" })
  @Length(2, 50, {
    message: "The name must be between 2 and 50 characters long",
  })
  title!: string;

  @IsString({ message: "Please enter a valid description" })
  @Length(2, 500, {
    message: "The description must be between 2 and 500 characters long",
  })
  description!: string;

  @IsEnum(TimeRange)
  timeRange!: TimeRangeType;

  @IsString()
  time!: string;

  @IsUUID()
  subcategoryId!: string;

  @IsUUID()
  routineId!: string;
}

export { ActivityDto };
