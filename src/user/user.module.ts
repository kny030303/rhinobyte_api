import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryModule } from '../database';
import { EmailModule } from '../email';
import { PasswordModule } from '../password';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [UserRepositoryModule, EmailModule, PasswordModule],
  exports: [UserService],
})
export class UserModule {}
