import { BadRequestException, Injectable, MethodNotAllowedException, NotImplementedException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model, RootFilterQuery, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { BookFactory } from './books.factory';
import axios from 'axios';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class BooksService {

  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    private readonly bookFactory: BookFactory,
    private readonly categoriesService: CategoriesService
  ) { }

  async create(createBookDto: CreateBookDto) {
    const newBook = await this.bookFactory.create(createBookDto);
    await this.bookModel.create(newBook);
    return newBook;
  }

  findAll({
    filter = {},
    page = 1,
    limit = 10,
    sort = { createdAt: -1 }
  }: { filter?: RootFilterQuery<Book>; page?: number; limit?: number; sort?: any }) {
    const skip = (page - 1) * limit;
    return this.bookModel.find(filter)
      .populate("categories", "name")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findOne(isbn: string) {
    const book = await this.bookModel.findOne({ _id: isbn }).populate("categories", "name");;

    if (book) return book;

    try {
      const hamelynResult = await axios.get(`https://serverless.hamelyn.com/api/v4/product/${isbn}`);
      const result = hamelynResult.data.productResult ? hamelynResult.data.productResult : hamelynResult.data;
      const homeLibraryBookFormat = await this.create(result);
      return homeLibraryBookFormat;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`Something went wrong searching <${isbn}> book.`);
    }
  }

  async updateAndFillBookCategories(isbn: string, categories: Array<string>) {
    const categoriesPromises = categories.map(category => this.categoriesService.findOne(category));
    const categoriesDb = await Promise.all(categoriesPromises);
    const categoryIds = categoriesDb.map(category => category._id);

    await this.bookModel.updateOne({ _id: isbn }, { $set: { categories: categoryIds } });
  }

  async update(isbn: string, updateBookDto: UpdateBookDto) {
    if (!updateBookDto.newBook) return;
    const authors = updateBookDto.newBook.authors.map((author: { value: string }) => author.value);
    const book = { ...updateBookDto.newBook, authors}
    await this.bookModel.updateOne({ _id: isbn }, { $set: { ...book } });
  }

  async updateImage(isbn: string, updatedImageBook: any) {
    throw new NotImplementedException();
  }

}
