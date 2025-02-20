import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsUUID, Length, Matches } from "class-validator";

import { TimeRange } from "@/modules/routines/enums/enums";
import { type TimeRange as TimeRangeType } from "@/modules/routines/types/types";

class ActivityDto {
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsString({ message: "Please enter a valid name" })
  @Length(2, 50, {
    message: "The name must be between 2 and 50 characters long",
  })
  title!: string;

  @ApiProperty()
  @IsString({ message: "Please enter a valid description" })
  @Length(2, 500, {
    message: "The description must be between 2 and 500 characters long",
  })
  description!: string;

  @ApiProperty({ enum: TimeRange })
  @IsEnum(TimeRange)
  timeRange!: TimeRangeType;

  @ApiProperty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Time must be in HH:MM format and between 00:00 and 23:59",
  })
  time!: string;

  @ApiProperty()
  @IsUUID()
  subcategoryId!: string;

  @ApiProperty()
  @IsUUID()
  routineId!: string;
}

export { ActivityDto };
