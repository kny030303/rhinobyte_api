import { ApiProperty } from '@nestjs/swagger';

export class PageListDto {
  @ApiProperty()
  dc_id: number;

  @ApiProperty()
  file_name: string;

  @ApiProperty()
  page_id: number;

  @ApiProperty()
  data: Buffer;

  @ApiProperty()
  label_list: string[];
}

export class SearchPageResposneDto {
  @ApiProperty()
  message: 'SUCCESS';

  @ApiProperty()
  total_page: number;

  @ApiProperty({ type: [PageListDto] })
  page_list: PageListDto[];

  constructor(data?: Partial<SearchPageResposneDto>) {
    Object.assign(this, data);
  }
}
