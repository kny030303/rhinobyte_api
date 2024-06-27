import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PageListDto {
  label_list: string[];
}

export class createDocumentDto {
  @ApiProperty()
  @IsString()
  dc_name: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  client?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  business?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty()
  dc_label_list: string[];

  @ApiProperty()
  @IsString()
  total_page: number;

  @ApiProperty({ type: [PageListDto] })
  page_list: PageListDto[];
}
