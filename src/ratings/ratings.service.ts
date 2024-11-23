import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from './entities/rating.entity';
import { Model } from 'mongoose';
import { RatingsFactory } from './ratings.factory';

@Injectable()
export class RatingsService {

  constructor(
    @InjectModel(Rating.name) private ratingModel: Model<Rating>,
    private readonly ratingFactory: RatingsFactory,
  ) { }

  async create(createRatingDto: CreateRatingDto) {
    const rating = this.ratingFactory.create(createRatingDto);
    await this.ratingModel.create(rating);
    return rating;
  }

  findAll() {
    return this.ratingModel.find({});
  }

  findByIsbn(isbn: string) {
    return this.ratingModel.find({ isbn });
  }

  update(isbn: string, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${isbn} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
