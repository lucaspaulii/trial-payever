import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('USER_SERVICE') private readonly userClient: ClientRMQ,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    this.userClient.emit('client inserted', user);
    const result = await user.save();
    return {email: result.email, id: result._id};
  }

  async findUserInfo(id: string) {
    const userInfo = await this.userModel.findById(id);
    delete userInfo.__v;
    return userInfo;
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.find({ email });
    return user as User[];
  }

  async findAvatar(id: string) {
    const userInfo: User = await this.userModel.findById(id);
    return userInfo.avatar;
  }

  remove(id: string) {
    return this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
