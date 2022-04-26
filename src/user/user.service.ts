import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Connection, Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<UserDocument>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  create(data: User): Promise<UserDocument> {
    const user = new this.UserModel(data);
    return user.save();
  }

  findOne(username: string): Promise<UserDocument> {
    return this.UserModel.findOne({ username: username }).exec();
  }

  findAll(): Promise<UserDocument[]> {
    return this.UserModel.find().exec();
  }

  getUser(id: number): Promise<UserDocument> {
    return this.UserModel.findById({ _id: id }).exec();
  }

  updateUser(id: string, data: User): Promise<UserDocument> {
    return this.UserModel.findOneAndUpdate({ _id: id }).exec();
  }

  deleteUser(id: string): Promise<UserDocument> {
    return this.UserModel.findOneAndUpdate({ _id: id }).exec();
  }
}
