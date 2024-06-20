import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupUserDto,
  SignupUserResponseDto,
  LoginUserDto,
  LoginUserResponseDto,
  AccessUserDto,
} from './dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('user')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @ApiCreatedResponse({
    description: '사용자 회원가입',
    type: SignupUserResponseDto,
  })
  @Post('/signup')
  async signup(@Body() user: SignupUserDto): Promise<SignupUserResponseDto> {
    try {
      return this.userService.signup(user);
    } catch (error) {
      throw error;
    }
  }

  @ApiCreatedResponse({
    description: '사용자 로그인',
    type: LoginUserResponseDto,
  })
  @Post('/login')
  async login(@Body() user: LoginUserDto): Promise<LoginUserResponseDto> {
    try {
      return this.userService.login(user);
    } catch (error) {
      throw error;
    }
  }

  @Get('/access')
  async access(@Query() user: AccessUserDto): Promise<void> {
    try {
      await this.userService.access(user);
    } catch (error) {
      throw error;
    }
  }
}
