import { Injectable } from '@nestjs/common';

@Injectable()
export class PageService {
  search(): string {
    return 'Hello World!';
  }
}
