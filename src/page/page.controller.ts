import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { PageService } from './page.service';
import { AuthenticationGuard } from '../auth';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { SearchPageDto, SearchPageResposneDto } from './dto';

@Controller('/documents/page')
@UseGuards(AuthenticationGuard)
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @ApiOperation({
    summary: '페이지 검색 API',
  })
  @ApiCreatedResponse({
    type: SearchPageResposneDto,
  })
  @Get()
  async search(@Body() body: SearchPageDto): Promise<SearchPageResposneDto> {
    return await this.pageService.search(body);
  }
}
