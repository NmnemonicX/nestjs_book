import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Connection, Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<UserDocument>,
    @InjectConnection()
    private connection: Connection,
    private jwtService: JwtService,
  ) {}

  async create(data: User): Promise<UserDocument> {
    const userExec = await this.UserModel.findOne({
      password: data.password,
    }).exec();
    if (userExec) {
      throw new HttpException('логин занят', HttpStatus.NOT_FOUND);
    }

    const user = new this.UserModel(data);
    return user.save();
    // return user.save(function(err) {
    //   if (err) throw err;
    //
    //   console.log('Book successfully saved.');
    // });
  }

  findOne(username: string): Promise<UserDocument> {
    return this.UserModel.findOne({ username: username }).exec();
  }
  findOneEmail(email: string): Promise<UserDocument> {
    return this.UserModel.findOne({ email: email }).exec();
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

  async signIn(user: any) {
    const payload = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
