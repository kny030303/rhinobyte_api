import { Controller, Post, UseGuards } from '@nestjs/common';
import { PageService } from './page.service';
import { AuthenticationGuard } from '../auth';

@Controller('/documents/page')
@UseGuards(AuthenticationGuard)
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  search(): string {
    return this.pageService.search();
  }
}
