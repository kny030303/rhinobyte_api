import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentResponseDto {
  @ApiProperty()
  dc_id: number;

  @ApiProperty()
  file_path: string;

  @ApiProperty()
  message: 'SUCCESS';

  constructor(data?: Partial<CreateDocumentResponseDto>) {
    Object.assign(this, data);
  }
}
