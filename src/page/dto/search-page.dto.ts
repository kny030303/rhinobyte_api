import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class SearchPageDto {
  @ApiProperty()
  @IsArray()
  search: string[];
}
