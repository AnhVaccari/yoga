import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Categories')
@UseGuards(JwtAuthGuard)
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getOneCategory(@Param('id') id: string) {
    return this.categoriesService.getCategory(+id);
  }
}
