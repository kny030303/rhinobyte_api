import { Injectable } from '@nestjs/common';
import { SearchPageDto, SearchPageResposneDto } from './dto';

@Injectable()
export class PageService {
  search(page_condition: SearchPageDto): SearchPageResposneDto {
    // TODO: 검색 조건에 맞게 페이지를 검색합니다.
    return new SearchPageResposneDto();
  }
}
