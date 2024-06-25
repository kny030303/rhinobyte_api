import { ApiProperty } from '@nestjs/swagger';

export class ResponseDocumentDto {
  @ApiProperty()
  dc_id: number;

  @ApiProperty()
  dc_name: string;

  @ApiProperty()
  file_path: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  client: string;

  @ApiProperty()
  business: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  label_list: string[];

  @ApiProperty()
  total_page: number;
}
