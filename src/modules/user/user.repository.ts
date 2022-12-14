import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(data);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(params: object): Promise<User> {
    return await this.userModel.findOne(params);
  }

  async findPosition(params): Promise<any> {
    return await this.userModel
      .findOne(params)
      .select(['-document', '-_id', '-full_name', '-password', '-account']);
  }

  async update(params: object, data: any): Promise<void> {
    return await this.userModel.findOneAndUpdate(params, data, {
      new: true,
    });
  }
}
