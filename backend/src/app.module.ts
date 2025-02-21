import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { LoggerModule } from "@/common/common.module";
import { DbModule } from "@/database/db.module";
import { CategoryModule } from "@/modules/categories/category.module";
import { RoutineModule } from "@/modules/routines/routine.module";
import { UnitModule } from "@/modules/units/unit.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    DbModule,
    RoutineModule,
    CategoryModule,
    UnitModule,
  ],
})
export class AppModule {}
