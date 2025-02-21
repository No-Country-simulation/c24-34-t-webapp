import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";

import { ActivityDto } from "@/modules/activities/dto/dto";
import { GoalDto } from "@/modules/goals/dto/dto";

import { RoutineDto } from "../dto/routine.dto";

class FindAllGoalDto extends OmitType(GoalDto, [
  "id",
  "unitId",
  "activityId",
] as const) {
  @ApiProperty()
  @IsString()
  unit!: string;
}

class FindAllActivitiesDto extends OmitType(ActivityDto, [
  "id",
  "routineId",
  "subcategoryId",
] as const) {
  @ApiProperty({ type: () => FindAllGoalDto })
  @ValidateNested({ each: true })
  @Type(() => FindAllGoalDto)
  goal!: FindAllGoalDto;

  @ApiProperty()
  @IsString()
  category!: string;

  @ApiProperty()
  @IsString()
  subcategory!: string;
}

class CreateRoutineDto extends OmitType(RoutineDto, ["id"] as const) {
  @ApiProperty({ type: () => [FindAllActivitiesDto] })
  @ValidateNested({ each: true })
  @Type(() => FindAllActivitiesDto)
  activities!: FindAllActivitiesDto[];
}

export { CreateRoutineDto };
