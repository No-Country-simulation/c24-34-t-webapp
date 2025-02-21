import { Injectable } from "@nestjs/common";

import { DbService } from "@/database/db.service";

import { FindAllCategoriesDto } from "./dto/find-all.dto";

@Injectable()
class CategoryService {
  constructor(private dbService: DbService) {}

  findAll(): FindAllCategoriesDto[] {
    return [{ id: "1", name: "Category 1" }];
  }
}

export { CategoryService };
