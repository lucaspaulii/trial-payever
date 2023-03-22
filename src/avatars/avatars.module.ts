import { Module } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Avatar, AvatarSchema } from './entities/avatar.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Avatar.name, schema: AvatarSchema }]),
  ],
  exports: [AvatarsService],
  controllers: [],
  providers: [AvatarsService],
})
export class AvatarsModule {}
