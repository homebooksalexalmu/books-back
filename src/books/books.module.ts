import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entities/book.entity';
import { CategoriesModule } from '../categories/categories.module';
import { BookFactory } from './books.factory';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    CategoriesModule,
    CloudinaryModule
  ],
  controllers: [BooksController],
  providers: [BooksService, BookFactory],
})
export class BooksModule { }
