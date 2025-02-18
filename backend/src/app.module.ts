import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { LoggerModule } from "@/common/common.module";
import { DbModule } from "@/database/db.module";
import { RoutineModule } from "@/modules/routines/routine.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    DbModule,
    RoutineModule,
  ],
})
export class AppModule {}
