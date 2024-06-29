import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';

@Injectable()
export class PasswordService {
  constructor(private readonly configService: ConfigService) {}

  public hashPassword(password: string, applySalt = true): string {
    const salt = this.configService.get<string>('PASSWORD_HASH_SALT');
    const saltedPassword = `${password}${applySalt ? salt : ''}`;

    return createHash('sha256').update(saltedPassword).digest('hex');
  }
}
