import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}

  async sendEmail(email: string) {
    await this.mailService.sendMail({
      to: email,
      from: 'lucaspauli22@gmail.com',
      subject: 'Welcome to Payever!',
      text: 'Your account at Test Payever has been created successfully',
    });
  }
}
