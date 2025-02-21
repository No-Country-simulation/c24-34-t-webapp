import { Injectable } from "@nestjs/common";

import { DbService } from "@/database/db.service";

@Injectable()
class UnitService {
  constructor(private dbService: DbService) {}

  async findAll(): Promise<string[]> {
    const units = await this.dbService.unit.findMany();
    const unitsDto = units.map(unit => unit.name);

    return unitsDto;
  }
}

export { UnitService };
