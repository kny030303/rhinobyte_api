import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class PasswordService {
  constructor(private readonly configService: ConfigService) {}

  private key = this.configService.get<string>('PASSWORD_HASH_KEY');
  private iv = this.configService.get<string>('PASSWORD_HASH_VI');

  encrypt(password: string): string {
    const cipher = createCipheriv(
      'aes-256-cbc',
      Buffer.from(this.key),
      Buffer.from(this.iv),
    );
    var crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  decryption(hashPassword: string): string {
    const decipher = createDecipheriv(
      'aes-256-cbc',
      Buffer.from(this.key),
      Buffer.from(this.iv),
    );
    let dec = decipher.update(hashPassword, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
}
