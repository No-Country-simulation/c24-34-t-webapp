import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Length, Matches } from "class-validator";

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
  @Length(2, 100, {
    message: "The description must be between 2 and 100 characters long",
  })
  description!: string;

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
