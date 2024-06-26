import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PageListDto {
  label: string[];
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
  @IsString()
  dc_label: string;

  @ApiProperty()
  @IsString()
  total_page: number;

  @ApiProperty({ type: [PageListDto] })
  @IsArray()
  page_list: PageListDto[];
}
