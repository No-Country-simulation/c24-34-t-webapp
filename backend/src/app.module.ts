import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { LoggerModule } from "@/common/common.module";
import { RoutineModule } from "@/modules/routines/routine.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    RoutineModule,
  ],
})
export class AppModule {}
