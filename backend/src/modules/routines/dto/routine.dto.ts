import { IsString, IsUUID, Length } from "class-validator";

class RoutineDto {
  @IsUUID()
  id!: string;

  @IsString({ message: "Por favor ingrese un nombre válido" })
  @Length(2, 50, {
    message: "El titulo tiene que tener entre 2 y 50 caracteres",
  })
  title!: string;

  @IsString({ message: "Por favor ingrese una descripción válida" })
  @Length(2, 500, {
    message: "La descripción tiene que tener entre 2 y 500 caracteres",
  })
  description!: string;
}

export { RoutineDto };
