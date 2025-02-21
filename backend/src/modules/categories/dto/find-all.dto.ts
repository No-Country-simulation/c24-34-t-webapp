import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { SubcategoryDto } from "@/modules/subcategories/dto/dto";

import { CategoryDto } from "./category.dto";

class FindAllSubCategoriesDto extends OmitType(SubcategoryDto, [
  "categoryId",
]) {}

class FindAllCategoriesDto extends CategoryDto {
  @ApiProperty({ type: () => [FindAllSubCategoriesDto] })
  @ValidateNested({ each: true })
  @Type(() => FindAllSubCategoriesDto)
  subcategories!: FindAllSubCategoriesDto[];
}

export { FindAllCategoriesDto };
