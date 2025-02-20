import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";

import { ActivityDto } from "./activity.dto";
import { GoalDto } from "./goal.dto";
import { RoutineDto } from "./routine.dto";

class FindAllGoalDto extends OmitType(GoalDto, [
  "unitId",
  "activityId",
] as const) {
  @ApiProperty()
  @IsString()
  unit!: string;
}

class FindAllActivitiesDto extends OmitType(ActivityDto, [
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

class FindAllRoutinesDto extends RoutineDto {
  @ApiProperty({ type: () => [FindAllActivitiesDto] })
  @ValidateNested({ each: true })
  @Type(() => FindAllActivitiesDto)
  activities!: FindAllActivitiesDto[];
}

export { FindAllRoutinesDto };
