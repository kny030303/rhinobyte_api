import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty()
  public user!: User;

  /**
   * 요청 성공 여부
   */
  @ApiProperty()
  public message!: 'SUCCESS';

  /**
   * 엑세스 토큰 (JWT)
   */
  @ApiProperty()
  public token!: string;

  constructor(data?: Partial<LoginUserResponseDto>) {
    Object.assign(this, data);
  }
}
