import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = {
        ...createUserDto,
        auth0Id: createUserDto.user_id,
        createdAt: createUserDto.created_at,
        updatedAt: createUserDto.updated_at,
      }
      await this.userModel.create(newUser);
      return newUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`User with email <${createUserDto.email}> is already exists.`);
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    const result = await this.userModel.find({});
    console.log(result)
    return JSON.stringify(result);
  }
}
