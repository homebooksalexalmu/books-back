import { PartialType } from '@nestjs/mapped-types';
import { CreateReadDto } from './create-read.dto';

export class UpdateReadDto extends PartialType(CreateReadDto) {}
