import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentService {
  create(): string {
    return 'Hello World!';
  }
}
