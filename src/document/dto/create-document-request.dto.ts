import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDocumentRequestDto {
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

  @ApiProperty()
  @IsString()
  document_label_yn: 'true' | 'false';
}
