import { Module } from "@nestjs/common";

import { UserModule } from "../users/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
class AuthModule {}

export { AuthModule };
