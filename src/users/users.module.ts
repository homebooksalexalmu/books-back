import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "src/auth/strategies/jwt.stratergy";
import { ConfigModule } from "@nestjs/config";

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    passportModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService]
})
export class UsersModule { }
