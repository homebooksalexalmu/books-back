import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { isValidObjectId, Model, Types } from 'mongoose';
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

  async findAll() {
    const categories = await this.categoryModel.find({});
    return categories.map(this.formatCategoryOutputDTO);
  }

  async findOne(id: string) {
    const filter = isValidObjectId(id) ? { _id: id } : { slug: id };
    const category = await this.categoryModel.findOne(filter);
    return this.formatCategoryOutputDTO(category);
  }

  private formatCategoryOutputDTO(category) {
    return {
      _id: category._id,
      name: category.name,
      slug: category.slug,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  }
}
