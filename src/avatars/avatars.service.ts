import { Injectable } from '@nestjs/common';
import { CreateAvatarDto } from './dto/create-avatar.dto';

@Injectable()
export class AvatarsService {
  create(createAvatarDto: CreateAvatarDto) {
    return 'This action adds a new avatar';
  }

  findOne(id: number) {
    return `This action returns a #${id} avatar`;
  }

  remove(id: number) {
    return `This action removes a #${id} avatar`;
  }
}
