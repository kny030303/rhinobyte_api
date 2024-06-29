import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendEmail(email: string, verifyKey: string): Promise<void> {
    try {
      const transporter = createTransport({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
          user: this.configService.get<string>('GOOGEL_USER_EMAIL'),
          pass: this.configService.get<string>('GOOGEL_USER_PASSWORD'),
        },
      });

      const mailOptions = {
        to: email,
        subject: '[RHINOBYTE] 회원가입 이메일 인증 메일입니다.',
        html: `인증링크 : <a href="http://localhost:3000/user/access/?email=${email}?verify_key=${verifyKey}">여기를 눌러주세요</a>`,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new NotAcceptableException('Failed to send email');
    }
  }
}
