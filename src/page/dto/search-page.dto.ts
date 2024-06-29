import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class SearchPageDto {
  @ApiProperty()
  @IsArray()
  file_name_list: string[];

  @ApiProperty()
  @IsArray()
  page_label_list: string[];

  @ApiProperty()
  @IsArray()
  dc_label_list: string[];
}
