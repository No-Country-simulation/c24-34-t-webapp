import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID, Length } from "class-validator";

class RoutineDto {
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsString({ message: "Please enter a valid title" })
  @Length(2, 50, {
    message: "The title must be between 2 and 50 characters long",
  })
  title!: string;

  @ApiProperty()
  @IsString({ message: "Please enter a valid description" })
  @Length(2, 500, {
    message: "The description must be between 2 and 500 characters long",
  })
  description!: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  userId!: string;
}

export { RoutineDto };
