import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../database';
import { EmailService } from '../email';
import { PasswordService } from '../password';
import { FindPasswordResponseDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly passwordService: PasswordService,
  ) {}

  async findPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: { EMAIL: email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashPassword = user.PASSWORD;
    const password = this.passwordService.decryption(hashPassword);

    this.emailService.findPasswordEmail(email, password);
    return new FindPasswordResponseDto({
      message: 'SUCCESS',
    });
  }
}
