import { Injectable, NotFoundException } from "@nestjs/common";

import { DbService } from "@/database/db.service";

import { FindAllCategoriesDto } from "./dto/find-all.dto";

@Injectable()
class CategoryService {
  constructor(private dbService: DbService) {}

  async findAll(): Promise<FindAllCategoriesDto[]> {
    const categories = await this.dbService.category.findMany({
      include: {
        subcategories: true,
      },
    });
    const categoriesDto = categories.map(category => {
      return {
        ...category,
        subcategories: category.subcategories.map(subcategory => {
          return {
            id: subcategory.id,
            name: subcategory.name,
          };
        }),
      };
    });
    return categoriesDto;
  }

  async findById(id: string): Promise<FindAllCategoriesDto> {
    const category = await this.dbService.category.findUnique({
      where: { id },
      include: {
        subcategories: true,
      },
    });

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    const categoriesDto = {
      ...category,
      subcategories: category.subcategories.map(subcategory => {
        return {
          id: subcategory.id,
          name: subcategory.name,
        };
      }),
    };

    return categoriesDto;
  }
}

export { CategoryService };
