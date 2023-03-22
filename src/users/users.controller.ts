import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import { AvatarsService } from 'src/avatars/avatars.service';
import imgToBase64 from 'src/utils/toBase64';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly avatarService: AvatarsService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findUserByEmail(
      createUserDto.email,
    );
    if (userExists.length !== 0) {
      throw new UnprocessableEntityException({
        errorCode: 422,
        message: 'e-mail already in use',
      });
    }
    const res = await this.usersService.createUser(createUserDto);
    const email = res.email;
    await this.emailService.sendEmail(email);
    return res.id;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userInfo = await this.usersService.findUserInfo(id);
    if (!userInfo) {
      throw new NotFoundException({
        errorCode: 404,
        message: 'user not found',
      });
    }
    return userInfo;
  }

  @Get(':id/avatar')
  async findAvatar(@Param('id') id: string) {
    const fileExists = await this.avatarService.findOne(id);
    if (fileExists.length === 0) {
      const userAvatar = await this.usersService.findUserInfo(id);

      if (!userAvatar) {
        throw new NotFoundException({
          errorCode: 404,
          message: 'user not found',
        });
      }
      const base64avatar = await imgToBase64(userAvatar.avatar);
      const objectId = userAvatar._id;

      await this.avatarService.create({
        userId: objectId.toString('hex'),
        avatar: base64avatar,
      });
      return base64avatar;
    } else {
      return fileExists[0].avatar;
    }
  }

  @Delete(':id/avatar')
  remove(@Param('id') id: string) {
    return this.avatarService.remove(id);
  }
}
