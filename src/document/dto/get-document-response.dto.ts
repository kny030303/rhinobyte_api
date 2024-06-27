import { ApiProperty } from '@nestjs/swagger';
import { ResponseDocumentDto } from './document.dto';

export class GetDocumentResponseDto {
  @ApiProperty()
  message: 'SUCCESS';

  @ApiProperty()
  dc_list: ResponseDocumentDto[];

  constructor(data?: Partial<GetDocumentResponseDto>) {
    Object.assign(this, data);
  }
}
