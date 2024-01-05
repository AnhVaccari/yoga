import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private categoriesRepository: Repository<Category>,
  ) {}
  async getCategories(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async getCategory(id: number): Promise<Category> {
    return this.categoriesRepository.findOne({ where: { category_id: id } });
  }
}
