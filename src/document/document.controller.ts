import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DocumentService } from './document.service';
import { AuthenticationGuard } from '../auth';
import { createDocumentDto, CreateDocumentResponseDto } from './dto';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('/documents/document')
@UseGuards(AuthenticationGuard)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @ApiOperation({
    summary: '제안서 생성 API',
  })
  @ApiCreatedResponse({
    type: CreateDocumentResponseDto,
  })
  @Post()
  async crate(
    @Body() body: createDocumentDto,
  ): Promise<CreateDocumentResponseDto> {
    try {
      return await this.documentService.createDocument(body);
    } catch (error) {
      throw error;
    }
  }
}
