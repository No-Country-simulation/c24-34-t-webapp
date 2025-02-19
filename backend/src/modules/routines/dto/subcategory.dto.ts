import { IsString, IsUUID, Length } from "class-validator";

class SubcategoryDto {
  @IsUUID()
  id!: string;

  @IsString({ message: "Por favor ingrese un nombre valido" })
  @Length(2, 50, {
    message: "El nombre tiene que tener entre 2 y 50 caracteres",
  })
  name!: string;

  @IsUUID()
  categoryId!: string;
}

export { SubcategoryDto };
