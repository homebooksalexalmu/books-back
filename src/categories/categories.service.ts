import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private readonly commonService: CommonService
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const slug = createCategoryDto.slug ? createCategoryDto.slug : this.commonService.generateSlug(createCategoryDto.name)

    const createdCategory = await this.categoryModel.create({
      ...createCategoryDto,
      slug
    });
    return createdCategory;
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }
}
