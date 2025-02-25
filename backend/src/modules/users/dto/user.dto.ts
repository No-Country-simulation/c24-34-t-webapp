import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsUUID, Length, Matches } from "class-validator";

class UserDto {
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsString({ message: "Please enter a valid name" })
  @Length(6, 12, {
    message: "The name must be between 6 and 12 characters long",
  })
  @Matches(/^\S+$/, {
    message: "The name must be a single word without spaces",
  })
  username!: string;

  @ApiProperty()
  @IsEmail({}, { message: "Please enter a valid email" })
  @Length(6, 320, {
    message: "The name must be between 6 and 320 characters long",
  })
  email!: string;
}

export { UserDto };
