import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { Avatar, AvatarDocument } from './entities/avatar.entity';

@Injectable()
export class AvatarsService {
  constructor(
    @InjectModel(Avatar.name) private avatarModel: Model<AvatarDocument>,
  ) {}

  async create(createAvatarDto: CreateAvatarDto) {
    const avatar = new this.avatarModel(createAvatarDto);
    return await avatar.save();
  }

  async findOne(userId: string) {
    const avatar = await this.avatarModel.find({ userId });
    return avatar as Avatar[];
  }

  remove(userId: string) {
    return `This action removes a #${userId} avatar`;
  }
}
