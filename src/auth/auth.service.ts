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
import { EmailService } from 'src/email';
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

    // TODO: test 이후 주석 해제
    // this.checkVerifyEmail(email);

    const user = await this.userRepository.findOne({
      where: { USER_EMAIL: email },
    });

    if (user) {
      throw new ConflictException('There is a same user already.');
    }

    const hash_password = this.passwordService.hashPassword(password);
    const verify_key = this.generateVerifyKey(email);

    const userEntity = await this.accessUserRepository.create({
      USER_EMAIL: email,
      USER_PASSWORD: hash_password,
      USER_VERIFY_KEY: verify_key,
    });

    await this.accessUserRepository.save(userEntity);
    await this.emailService.sendEmail(signUpRequest.email, verify_key);

    return new SignupUserResponseDto({
      user: { email: userEntity.USER_EMAIL },
      message: 'SUCCESS',
    });
  }

  async login(user: LoginUserDto): Promise<LoginUserResponseDto> {
    const { email, password } = user;

    // TODO: test 이후 주석 해제
    // this.checkVerifyEmail(email);

    await this.passwordService.verify(email, password);

    const payload = { email };

    return new LoginUserResponseDto({
      user: {
        email,
      },
      message: 'SUCCESS',
      token: await this.jwtService.signAsync(payload),
    });
  }

  async access(accessUserRequest: AccessUserDto): Promise<void> {
    const { email, verify_key } = accessUserRequest;
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
  }

  private generateVerifyKey(email: string): string {
    const verify_key = Buffer.from(
      `{email: ${email}, date:${new Date().getTime()}}`,
    ).toString('base64');
    return verify_key;
  }

  private checkVerifyEmail(email: string): void {
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
