import { IsNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateRatingDto {

    @IsString()
    user: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(5)
    rate: number;

    @IsString()
    isbn: string;
}

