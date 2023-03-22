import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AvatarsModule } from './avatars/avatars.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AvatarsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
