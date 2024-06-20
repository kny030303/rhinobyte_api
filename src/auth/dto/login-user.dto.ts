import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  /**
   * 사용자 구글 이메일
   * @example test.promotion.kr
   */
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  /**
   * 사용자 비밀번호
   * @example userpasswrod1234!
   */
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
