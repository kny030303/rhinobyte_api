import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import { UserRepository } from '../database';

@Injectable()
export class PasswordService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  public verify(email: string, password: string): void {
    const user = this.userRepository.findOne({
      where: { USER_EMAIL: email, USER_PASSWORD: password },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  public hashPassword(password: string, applySalt = true): string {
    const salt = this.configService.get<string>('PASSWORD_HASH_SALT');
    const saltedPassword = `${password}${applySalt ? salt : ''}`;

    return createHash('sha256').update(saltedPassword).digest('hex');
  }
}
