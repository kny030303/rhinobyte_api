import { Injectable } from '@nestjs/common';
import { SearchPageResposneDto } from './dto';

@Injectable()
export class PageService {
  search(): SearchPageResposneDto {
    return new SearchPageResposneDto();
  }
}
