import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      auth0Id: createUserDto.user_id,
      createdAt: createUserDto.created_at,
      updatedAt: createUserDto.updated_at,
    }
    await this.userModel.create(newUser);
    return newUser;
  }

  async findAll() {
    const result = await this.userModel.find({});
    console.log(result)
    return JSON.stringify(result);
  }
}
