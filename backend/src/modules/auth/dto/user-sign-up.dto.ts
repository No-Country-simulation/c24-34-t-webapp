import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, Matches } from "class-validator";

class UserSignUpDto {
  @ApiProperty()
  @IsString({ message: "Please enter a valid name" })
  @Length(6, 12, {
    message: "The username must be between 6 and 12 characters long",
  })
  @Matches(/^\S+$/, {
    message: "The username must be a single word without spaces",
  })
  username!: string;

  @ApiProperty()
  @IsEmail({}, { message: "Please enter a valid email" })
  @Length(6, 50, {
    message: "The email must be between 6 and 50 characters long",
  })
  email!: string;

  @ApiProperty()
  @IsString({ message: "Please enter a valid password" })
  @Length(6, 24, {
    message: "The password must be between 6 and 24 characters long",
  })
  @Matches(/[A-Z]/, {
    message: "The password must contain at least one uppercase letter",
  })
  @Matches(/[a-z]/, {
    message: "The password must contain at least one lowercase letter",
  })
  @Matches(/\d/, {
    message: "The password must contain at least one number",
  })
  @Matches(/[^\dA-Za-z]/, {
    message: "The password must contain at least one special character",
  })
  password!: string;
}

export { UserSignUpDto };
