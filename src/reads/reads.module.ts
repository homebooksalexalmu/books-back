import { Module } from '@nestjs/common';
import { ReadsService } from './reads.service';
import { ReadsController } from './reads.controller';
import { Read, ReadSchema } from './entities/read.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from 'src/auth/auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Read.name, schema: ReadSchema }]), AuthModule],
  controllers: [ReadsController],
  providers: [ReadsService],
})
export class ReadsModule { }
