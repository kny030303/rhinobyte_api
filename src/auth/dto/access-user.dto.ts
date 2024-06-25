import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AccessUserDto {
  /**
   * 사용자 구글 이메일
   * @example test.promotion.kr
   */
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  /**
   * 사용자 회원가입 인증 키
   * @example testtoken
   */
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  verify_key: string;
}
