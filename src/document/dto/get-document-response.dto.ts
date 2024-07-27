import { ApiProperty } from '@nestjs/swagger';
import { DocumentResponseDto } from './document-response.dto';

export class GetDocumentResponseDto {
  @ApiProperty()
  message: 'SUCCESS';

  @ApiProperty()
  dc_list: DocumentResponseDto[];

  constructor(data?: Partial<GetDocumentResponseDto>) {
    Object.assign(this, data);
  }
}
