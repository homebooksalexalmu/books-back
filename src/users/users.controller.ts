import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Headers,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "../auth/guards/JwtAuth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Headers() headers) {
    return await this.usersService.findAll();
  }

}
