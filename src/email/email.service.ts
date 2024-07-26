import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  async joinEmail(email: string, verifyKey: string): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: '[RHINOBYTE] 회원가입 이메일 인증 메일입니다.',
      html: `인증링크 : <a href="${this.configService.get<string>('SERVER_HOST')}/auth/access/?email=${email}&verify_key=${verifyKey}">여기를 눌러주세요</a> <br> 인증링크는 30분 후 만료됩니다.`,
    });
  }

  async findPasswordEmail(email: string, password: String): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: '[RHINOBYTE] 비밀번호 찾기 메일입니다.',
      html: `회원님의 비밀번호는 ${password} 입니다.<br>비밀번호가 노출되시 않도록 주의해주세요`,
    });
  }

  private async sendEmail(options: Mail.Options) {
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

      await transporter.sendMail(options);
    } catch (error) {
      throw new NotAcceptableException('Failed to send email');
    }
  }
}
