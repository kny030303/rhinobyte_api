import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { UserRepositoryModule } from '../database';

@Module({
  imports: [UserRepositoryModule],
  providers: [PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}
