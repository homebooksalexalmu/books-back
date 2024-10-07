import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class FindBookQueryDto {
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    page: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    limit: number;
}
