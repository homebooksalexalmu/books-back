import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { FindBookQueryDto } from './dto/find-book-query.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  findAll(@Query() query: FindBookQueryDto) {
    const { page = 1, limit = 10 } = query;
    return this.booksService.findAll({
      page,
      limit
    });
  }

  @Get(':isbn')
  findOne(@Param('isbn') isbn: string) {
    return this.booksService.findOne(isbn);
  }

  @Patch(':isbn')
  update(@Param('isbn') isbn: string, @Body() updateBookDto: UpdateBookDto) {
    if (updateBookDto.categories) {
      return this.booksService.updateAndFillBookCategories(isbn, updateBookDto.categories);
    }

    return this.booksService.update(isbn, updateBookDto);
  }
}
