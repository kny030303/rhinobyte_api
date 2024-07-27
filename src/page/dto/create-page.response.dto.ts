import { ApiProperty } from '@nestjs/swagger';

export class CreatePageResponseDto {
  @ApiProperty()
  message: 'SUCCESS';

  @ApiProperty()
  file_path: string;

  @ApiProperty()
  page_id: number;

  constructor(data?: Partial<CreatePageResponseDto>) {
    Object.assign(this, data);
  }
}
