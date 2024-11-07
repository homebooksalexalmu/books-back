import { IsOptional, IsString } from "class-validator";
import { BookReadsStatus } from "../reads-status.enum";

export class FindAllDto {

    @IsString()
    @IsOptional()
    status?: BookReadsStatus;

    @IsString()
    @IsOptional()
    reader?: string;

    @IsString()
    @IsOptional()
    categories?: string;
}
