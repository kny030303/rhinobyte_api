import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class SearchPageDto {
  @ApiProperty()
  @IsString()
  file_name: string;

  @ApiProperty()
  @IsString()
  page_label: string[];

  @ApiProperty()
  @IsArray()
  dc_label_list: string[];
}
