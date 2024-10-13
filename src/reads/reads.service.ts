import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReadDto } from './dto/create-read.dto';
import { UpdateReadDto } from './dto/update-read.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Read } from './entities/read.entity';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/auth/auth.service';

@Injectable()
export class ReadsService {

  constructor(@InjectModel(Read.name) private readModel: Model<Read>, private readonly userService: UsersService) { }

  async create(createReadDto: CreateReadDto) {

    const user = await this.userService.findOneByAuth0Id(createReadDto.user);

    if (!user) {
      throw new UnauthorizedException(`User with email or id <${createReadDto.user}> doesnt exists`);
    }

    const formattedDTO = {
      ...createReadDto,
      user: new Types.ObjectId(String(user._id))
    }
    if (await this.findOneByUserAndBook(formattedDTO.user, formattedDTO.book)) {
      throw new BadRequestException("This read already exists");
    }

    const newRead = this.readModel.create(formattedDTO);
    return newRead;
  }

  findAll() {
    return this.readModel.aggregate([
      {
        $group: {
          _id: "$book",
          userReads: {
            $push: {
              _id: "$_id",
              user: "$user",
              status: "$status",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt"
            }
          }
        }
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo"
        }
      },
      {
        $unwind: {
          path: "$bookInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          isbn: "$_id",
          title: "$bookInfo.title",
          description: "$bookInfo.description",
          portrait: "$bookInfo.portrait",
          publisher: "$bookInfo.publisher",
          authors: "$bookInfo.authors",
          categories: "$bookInfo.categories",
          pages: "$bookInfo.pages",
          createdAt: "$bookInfo.createdAt",
          updatedAt: "$bookInfo.updatedAt"
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categoryDetails"
        }
      },
      {
        $addFields: {
          categories: {
            $map: {
              input: "$categoryDetails",
              as: "category",
              in: {
                _id: "$$category._id",
                name: "$$category.name"
              }
            }
          }
        }
      },
      {
        $project: {
          bookInfo: 0,
          categoryDetails: 0,
          _id: 0
        }
      },
      {
        $unwind: "$userReads"
      },
      {
        $lookup: {
          from: "users",
          localField: "userReads.user",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          "userReads.user": {
            _id: "$userDetails._id",
            name: "$userDetails.name",
            picture: "$userDetails.picture"
          }
        }
      },
      {
        $group: {
          _id: "$isbn",
          isbn: { "$first": "$isbn" },
          title: { "$first": "$title" },
          description: { "$first": "$description" },
          portrait: { "$first": "$portrait" },
          publisher: { "$first": "$publisher" },
          authors: { "$first": "$authors" },
          categories: { "$first": "$categories" },
          pages: { "$first": "$pages" },
          createdAt: { "$first": "$createdAt" },
          updatedAt: { "$first": "$updatedAt" },
          userReads: { "$push": "$userReads" }
        }
      }
    ]);
  }

  findOneByIsbn(isbn: string) {
    return this.readModel.aggregate([
      {
        $match: { book: isbn }
      },
      {
        $group: {
          _id: "$book",
          userReads: {
            $push: {
              _id: "$_id",
              user: "$user",
              status: "$status",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt"
            }
          }
        }
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo"
        }
      },
      {
        $unwind: {
          path: "$bookInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          isbn: "$_id",
          title: "$bookInfo.title",
          description: "$bookInfo.description",
          portrait: "$bookInfo.portrait",
          publisher: "$bookInfo.publisher",
          authors: "$bookInfo.authors",
          categories: "$bookInfo.categories",
          pages: "$bookInfo.pages",
          createdAt: "$bookInfo.createdAt",
          updatedAt: "$bookInfo.updatedAt"
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categoryDetails"
        }
      },
      {
        $addFields: {
          categories: {
            $map: {
              input: "$categoryDetails",
              as: "category",
              in: {
                _id: "$$category._id",
                name: "$$category.name"
              }
            }
          }
        }
      },
      {
        $project: {
          bookInfo: 0,
          categoryDetails: 0,
          _id: 0
        }
      },
      {
        $unwind: "$userReads"
      },
      {
        $lookup: {
          from: "users",
          localField: "userReads.user",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          "userReads.user": {
            _id: "$userDetails._id",
            name: "$userDetails.name",
            picture: "$userDetails.picture"
          }
        }
      },
      {
        $group: {
          _id: "$isbn",
          isbn: { "$first": "$isbn" },
          title: { "$first": "$title" },
          description: { "$first": "$description" },
          portrait: { "$first": "$portrait" },
          publisher: { "$first": "$publisher" },
          authors: { "$first": "$authors" },
          categories: { "$first": "$categories" },
          pages: { "$first": "$pages" },
          createdAt: { "$first": "$createdAt" },
          updatedAt: { "$first": "$updatedAt" },
          userReads: { "$push": "$userReads" }
        }
      }
    ]);
  }

  async findOneByUserAndBook(user: string | Types.ObjectId, isbn: string) {
    const result = await this.readModel.findOne({ book: isbn, user });

    if (!result) return null;

    return result as Read;
  }

  async update(isbn: string, updateReadDto: UpdateReadDto) {
    const { status, user } = updateReadDto;
    const userId = new Types.ObjectId(user);

    if (!status) {
      return;
    }

    const read = await this.findOneByUserAndBook(userId, isbn);
    if (!read) {
      throw new BadRequestException(`Read with <${isbn}> book does not exists`);
    }

    await this.readModel.updateOne({ book: isbn, user: userId }, { $set: { status, updatedAt: new Date() } });
    return;
  }

  async remove(id: string) {
    const typedId = new Types.ObjectId(id);
    const read = await this.readModel.findById(typedId);

    if (!read) throw new BadRequestException(`Read with id <${id}> does not exists`);

    await this.readModel.deleteOne(typedId);

    return;
  }

}
