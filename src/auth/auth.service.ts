import { Injectable, NotAcceptableException } from '@nestjs/common';
import {
  SignupUserDto,
  SignupUserResponseDto,
  LoginUserDto,
  LoginUserResponseDto,
  AccessUserDto,
} from './dto';
import { EmailService } from 'src/email';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../password';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly passwordService: PasswordService,
  ) {}

  async signup(user: SignupUserDto): Promise<SignupUserResponseDto> {
    const { email, password } = user;

    // TODO: test 이후 주석 해제
    // this.checkVerifyEmail(email);

    // TODO: DB 조회 후 중복된 이메일이 있는지 확인

    const token = this.generateVerifyKey(email);
    // TODO: DB에 사용자 정보 저장과 verify_key 저장 로직 추가
    await this.emailService.sendEmail(user.email, token);

    // TODO: 30분 후에 verify_key 만료 처리
    return new SignupUserResponseDto({ user: { email }, message: 'SUCCESS' });
  }

  async login(user: LoginUserDto): Promise<LoginUserResponseDto> {
    const { email, password } = user;

    // TODO: test 이후 주석 해제
    // this.checkVerifyEmail(email);

    this.passwordService.verify(email, password);

    const payload = { email };
    const userData: LoginUserResponseDto = {
      user: {
        email,
      },
      message: 'SUCCESS',
      token: await this.jwtService.signAsync(payload),
    };

    return new LoginUserResponseDto(userData);
  }

  async access(user: AccessUserDto): Promise<void> {
    const { email, token } = user;
    // TODO:  email과 token 검증 로직 추가
    // TODO: 실패시 token 만료
    // TODO: 성공시 user access
  }

  private generateVerifyKey(email: string): string {
    const verify_key = Buffer.from(`${email}_${new Date().getTime()}`).toString(
      'base64',
    );
    return verify_key;
  }

  private checkVerifyEmail(email: string): void {
    if (email.split('@')[1] !== 'promotion.kr') {
      throw new NotAcceptableException('Invalid email domain');
    }
  }
}
