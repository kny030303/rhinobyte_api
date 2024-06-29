import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  SignupUserDto,
  SignupUserResponseDto,
  LoginUserDto,
  LoginUserResponseDto,
  AccessUserDto,
} from './dto';
import { EmailService } from '../email';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../password';
import { AccessUserRepository, UserRepository } from '../database';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly passwordService: PasswordService,
    private readonly userRepository: UserRepository,
    private readonly accessUserRepository: AccessUserRepository,
  ) {}

  async signup(signUpRequest: SignupUserDto): Promise<SignupUserResponseDto> {
    const { email, password } = signUpRequest;

    this.checkVerifyEmail(email);

    // user email 중복 체크
    const user = await this.userRepository.findOne({
      where: { USER_EMAIL: email },
    });

    if (user) {
      throw new ConflictException('There is a same user already.');
    }

    const hashPassword = this.passwordService.hashPassword(password);
    const verifyKey = this.generateVerifyKey(email);

    const userEntity = await this.accessUserRepository.create({
      USER_EMAIL: email,
      USER_PASSWORD: hashPassword,
      USER_VERIFY_KEY: verifyKey,
    });

    await this.accessUserRepository.save(userEntity);
    await this.emailService.sendEmail(signUpRequest.email, verifyKey);

    return new SignupUserResponseDto({
      user: { email: userEntity.USER_EMAIL },
      message: 'SUCCESS',
    });
  }

  async login(loginRequest: LoginUserDto): Promise<LoginUserResponseDto> {
    const { email, password } = loginRequest;

    this.checkVerifyEmail(email);

    const hashPassword = await this.passwordService.hashPassword(password);
    const payload = { email };

    // user email, password 체크
    const user = await this.userRepository.findOne({
      where: { USER_EMAIL: email, USER_PASSWORD: hashPassword },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new LoginUserResponseDto({
      user: {
        email,
      },
      message: 'SUCCESS',
      token: await this.jwtService.signAsync(payload),
    });
  }

  async access(accessUserRequest: AccessUserDto): Promise<string> {
    const { email, verify_key } = accessUserRequest;

    const user = await this.userRepository.findOne({
      where: { USER_EMAIL: email },
    });

    if (user) {
      throw new ConflictException('There is a same user already.');
    }
    const accessUser = await this.accessUserRepository.findOne({
      where: {
        USER_EMAIL: email,
        USER_VERIFY_KEY: verify_key,
        USER_ACCESS: false,
      },
    });

    if (!accessUser) {
      throw new NotFoundException('User not found');
    }

    if (this.isMoreThanThirtyMinutesOld(accessUser.CREATED_AT)) {
      throw new UnauthorizedException('Verify key expired');
    }

    await this.userRepository.save({
      USER_EMAIL: email,
      USER_PASSWORD: accessUser.USER_PASSWORD,
    });

    return '정상 가입 되셨습니다.';
  }

  private generateVerifyKey(email: string): string {
    const verify_key = Buffer.from(
      `{email: ${email}, date:${new Date().getTime()}}`,
    ).toString('base64');
    return verify_key;
  }

  private checkVerifyEmail(email: string): void {
    // promotion.kr 도메인만 허용
    if (email.split('@')[1] !== 'promotion.kr') {
      throw new NotAcceptableException('Invalid email domain');
    }
  }

  private isMoreThanThirtyMinutesOld(date) {
    const currentTime = new Date();
    const thirtyMinutesAgo = new Date(currentTime.getTime() - 30 * 60 * 1000);
    return new Date(date) < thirtyMinutesAgo;
  }
}
