import { IsString, IsUUID, Length } from "class-validator";

class CategoryDto {
  @IsUUID()
  id!: string;

  @IsString({ message: "Please enter a valid name" })
  @Length(2, 50, {
    message: "The name must be between 2 and 50 characters long",
  })
  name!: string;
}

export { CategoryDto };
