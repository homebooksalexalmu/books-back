import { IsString } from "class-validator";
import { BookReadsStatus } from "../reads-status.enum";

export class CreateReadDto {

    @IsString()
    status: BookReadsStatus;

    @IsString()
    book: string;

    @IsString()
    user: string;
}
