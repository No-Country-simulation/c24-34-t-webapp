import { OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";

import { ActivityDto } from "./activity.dto";
import { GoalDto } from "./goal.dto";
import { RoutineDto } from "./routine.dto";

class FindAllGoalDto extends OmitType(GoalDto, [
  "id",
  "unitId",
  "activityId",
] as const) {
  @IsString()
  unit!: string;
}

class FindAllActivitiesDto extends OmitType(ActivityDto, [
  "id",
  "routineId",
  "subcategoryId",
] as const) {
  @ValidateNested({ each: true })
  @Type(() => FindAllGoalDto)
  goal!: FindAllGoalDto;

  @IsString()
  category!: string;

  @IsString()
  subcategory!: string;
}

class CreateRoutineDto extends OmitType(RoutineDto, ["id"] as const) {
  @ValidateNested({ each: true })
  @Type(() => FindAllActivitiesDto)
  activities!: FindAllActivitiesDto[];
}

export { CreateRoutineDto };
