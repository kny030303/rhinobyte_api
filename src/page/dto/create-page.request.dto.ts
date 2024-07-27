import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePageRequestDto {
  @ApiProperty()
  @IsString()
  dc_id: number;

  @ApiProperty()
  page_label_list: string[];

  @ApiProperty()
  @IsString()
  page_label_yn: 'true' | 'false';

  @ApiProperty({})
  @IsString()
  @IsOptional()
  width?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  height?: number;

  @ApiProperty()
  @IsString()
  page_no: number;
}
