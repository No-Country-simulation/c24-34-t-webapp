import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { CategoryService } from "./category.service";
import { FindAllCategoriesDto } from "./dto/dto";

@ApiTags("categories")
@Controller("categories")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get("")
  @ApiOperation({ summary: "Find all categories" })
  @ApiOkResponse({ type: FindAllCategoriesDto, isArray: true })
  getUsers() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Find category by id" })
  @ApiOkResponse({ type: FindAllCategoriesDto, isArray: false })
  async delete(@Param("id") id: string) {
    if (!id) {
      throw new BadRequestException("Category not found");
    }
    return this.categoryService.findById(id);
  }
}
