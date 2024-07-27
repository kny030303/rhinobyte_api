import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class SearchPageRequestDto {
  @ApiProperty()
  @IsArray()
  search: string[];
}
