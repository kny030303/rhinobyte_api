import { Controller, Post, UseGuards } from '@nestjs/common';
import { DocumentService } from './document.service';
import { AuthenticationGuard } from '../auth';

@Controller('/documents/document')
@UseGuards(AuthenticationGuard)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  crate(): string {
    return this.documentService.create();
  }
}
