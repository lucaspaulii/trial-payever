import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';

@Controller('avatars')
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @Post()
  create(@Body() createAvatarDto: CreateAvatarDto) {
    return this.avatarsService.create(createAvatarDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avatarsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avatarsService.remove(+id);
  }
}
