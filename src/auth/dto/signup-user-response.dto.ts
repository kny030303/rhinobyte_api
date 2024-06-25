import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.dto';

export class SignupUserResponseDto {
  @ApiProperty()
  public user!: User;

  /**
   * 요청 성공 여부
   */

  @ApiProperty()
  public message!: 'SUCCESS';

  constructor(data?: Partial<SignupUserResponseDto>) {
    Object.assign(this, data);
  }
}
