import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    email: string;

    @IsString()
    user_id: string;

    @IsString()
    created_at: string;

    @IsString()
    picture: string;

    @IsBoolean()
    email_verified: boolean;

    @IsString()
    @IsOptional()
    updated_at: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    nickname: string;

    @IsString()
    @IsOptional()
    username: string;
}
