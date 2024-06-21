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
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @ApiOperation({
    summary: '회원가입 API',
  })
  @ApiCreatedResponse({
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

  @ApiOperation({
    summary: '로그인 API',
  })
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

  @ApiOperation({
    summary: '회원가입 인증 API',
  })
  @Get('/access')
  async access(@Query() user: AccessUserDto): Promise<void> {
    try {
      await this.userService.access(user);
    } catch (error) {
      throw error;
    }
  }
}
