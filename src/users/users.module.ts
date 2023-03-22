import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { EmailService } from 'src/email/email.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AvatarsModule } from 'src/avatars/avatars.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'payever_rabbit',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    AvatarsModule
  ],
  controllers: [UsersController],
  providers: [UsersService, EmailService],
})
export class UsersModule {}
