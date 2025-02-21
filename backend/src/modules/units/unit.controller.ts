import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { UnitService } from "./unit.service";

@ApiTags("units")
@Controller("units")
export class UnitController {
  constructor(private unitService: UnitService) {}

  @Get("")
  @ApiOperation({ summary: "Find all units" })
  @ApiOkResponse({ type: String, isArray: true })
  findAll() {
    return this.unitService.findAll();
  }
}
