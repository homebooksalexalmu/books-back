import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  async findAll() {
    const result = await this.userModel.find({});
    console.log(result)
    return JSON.stringify(result);
  }
}
