import { Controller, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  findPassword(@Query('email') email: string) {
    try {
      return this.userService.findPassword(email);
    } catch (error) {
      throw error;
    }
  }
}
