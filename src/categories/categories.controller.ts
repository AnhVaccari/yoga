import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@ApiBearerAuth()
@ApiTags('yoga')
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of categories',
    type: [Category],
  })
  async getAllCategories() {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one category' })
  @ApiResponse({
    status: 200,
    description: 'One category',
    type: [Category],
  })
  async getOneCategory(@Param('id') id: string) {
    return this.categoriesService.getCategory(+id);
  }
}
