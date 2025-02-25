import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { LoggerModule } from "@/common/common.module";
import { DbModule } from "@/database/db.module";
import { AuthModule } from "@/modules/auth/auth.module";
import { CategoryModule } from "@/modules/categories/category.module";
import { RoutineModule } from "@/modules/routines/routine.module";
import { UnitModule } from "@/modules/units/unit.module";
import { UserModule } from "@/modules/users/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    DbModule,
    RoutineModule,
    CategoryModule,
    UnitModule,
    UserModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1d" },
      }),
    }),
    AuthModule,
  ],
})
export class AppModule {}
