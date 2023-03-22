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
import { convertImageToBase64 } from '../utils/toDataUrl';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
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
    const generatedEmail = await this.usersService.createUser(createUserDto);
    await this.emailService.sendEmail(generatedEmail);
    return;
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
    const userAvatar = await this.usersService.findUserInfo(id);
    console.log(userAvatar);
    const base64avatar = convertImageToBase64(userAvatar, function (dataUrl) {
      console.log('RESULT', dataUrl);
    });
    if (!userAvatar) {
      throw new NotFoundException({
        errorCode: 404,
        message: 'user not found',
      });
    }
    return userAvatar;
  }

  @Delete(':id/avatar')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
