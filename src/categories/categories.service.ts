import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  async getCategories(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async getCategory(id: number): Promise<Category> {
    return this.categoriesRepository.findOne({ where: { id: id } });
  }
}
