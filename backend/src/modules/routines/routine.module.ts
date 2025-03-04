import { Global, Module } from "@nestjs/common";

import { RoutineController } from "./routine.controller";
import { RoutineService } from "./routine.service";

@Global()
@Module({
  controllers: [RoutineController],
  providers: [RoutineService],
  exports: [RoutineService],
})
export class RoutineModule {}
