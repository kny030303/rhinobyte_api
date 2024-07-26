import { ApiProperty } from '@nestjs/swagger';

export class FindPasswordResponseDto {
  @ApiProperty()
  message: 'SUCCESS';

  constructor(data?: Partial<FindPasswordResponseDto>) {
    Object.assign(this, data);
  }
}
