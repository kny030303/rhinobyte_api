import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class PageListDto {
  label_list: string[];
}
export class createDocumentDto {
  @ApiProperty()
  @IsString()
  file_name: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsString()
  client: string;

  @ApiProperty()
  @IsString()
  business: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  dc_label: string;

  @ApiProperty()
  @IsString()
  total_page: number;

  @ApiProperty({ type: [PageListDto] })
  @IsArray()
  page_list: PageListDto[];

  @ApiProperty()
  dc_data: Buffer;
}
