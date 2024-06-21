import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../auth';
import { UserService } from './user.service';

@Controller('')
@UseGuards(AuthenticationGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  mypage(): string {
    return this.userService.mypage();
  }
}
