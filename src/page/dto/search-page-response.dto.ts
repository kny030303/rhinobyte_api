import { ApiProperty } from '@nestjs/swagger';

export class PageListDto {
  @ApiProperty()
  dc_id: number;

  @ApiProperty()
  page_id: number;

  @ApiProperty()
  page_no: number;

  @ApiProperty()
  created_at: string;
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
