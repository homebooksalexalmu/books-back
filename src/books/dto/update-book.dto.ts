import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    categories?: Array<string>;
}
