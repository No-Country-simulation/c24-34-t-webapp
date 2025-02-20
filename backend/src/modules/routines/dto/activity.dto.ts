import { IsEnum, IsString, IsUUID, Length } from "class-validator";

import { TimeRange } from "@/modules/routines/enums/enums";
import { type TimeRange as TimeRangeType } from "@/modules/routines/types/types";

class ActivityDto {
  @IsUUID()
  id!: string;

  @IsString({ message: "Por favor ingrese un nombre valido" })
  @Length(2, 50, {
    message: "El nombre tiene que tener entre 2 y 50 caracteres",
  })
  title!: string;

  @IsString({ message: "Por favor ingrese una descripción válida" })
  @Length(2, 500, {
    message: "La descripción tiene que tener entre 2 y 500 caracteres",
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
