import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReadsService } from './reads.service';
import { CreateReadDto } from './dto/create-read.dto';
import { UpdateReadDto } from './dto/update-read.dto';
import { FindAllDto } from './dto/find-all.dto';

@Controller('reads')
export class ReadsController {
  constructor(private readonly readsService: ReadsService) { }

  @Post()
  create(@Body() createReadDto: CreateReadDto) {
    return this.readsService.create(createReadDto);
  }

  @Get()
  findAll(@Query() query: FindAllDto) {
    return this.readsService.findAllByCriteria(query);
  }

  @Get(':isbn')
  findOne(@Param('isbn') isbn: string) {
    return this.readsService.findOneByIsbn(isbn);
  }

  @Patch(':isbn')
  update(@Param('isbn') isbn: string, @Body() updateReadDto: UpdateReadDto) {
    return this.readsService.update(isbn, updateReadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readsService.remove(id);
  }
}
