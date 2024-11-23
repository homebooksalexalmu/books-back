import { CreateRatingDto } from './dto/create-rating.dto';

export class RatingsFactory {
    create(createRatingDto: CreateRatingDto) {
        return {
            ...createRatingDto,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }
}
