import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Length } from "class-validator";

class SubcategoryDto {
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsString({ message: "Please enter a valid name" })
  @Length(2, 50, {
    message: "The name must be between 2 and 50 characters long",
  })
  name!: string;

  @ApiProperty()
  @IsUUID()
  categoryId!: string;
}

export { SubcategoryDto };
