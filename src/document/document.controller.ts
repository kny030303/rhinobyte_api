import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import {
  AccessTokenPayloads,
  AuthenticatedUser,
  AuthenticationGuard,
} from '../auth';
import { createDocumentDto, CreateDocumentResponseDto } from './dto';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { GetDocumentResponseDto } from './dto/get-document-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/documents')
@UseGuards(AuthenticationGuard)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @ApiOperation({
    summary: '사용자 제안서 조회 API',
  })
  @ApiCreatedResponse({
    type: GetDocumentResponseDto,
  })
  @Get()
  async getByEmail(
    @Query('email') email: string,
  ): Promise<GetDocumentResponseDto> {
    try {
      return await this.documentService.getByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({
    summary: '제안서 생성 API',
  })
  @ApiCreatedResponse({
    type: CreateDocumentResponseDto,
  })
  @Post('/document')
  @UseInterceptors(FileInterceptor('dc_data'))
  async create(
    @AuthenticatedUser() user: AccessTokenPayloads,
    @UploadedFile() dc_data: Express.Multer.File,
    @Body() body: createDocumentDto,
  ): Promise<CreateDocumentResponseDto> {
    try {
      const email = user.email;
      return await this.documentService.createDocument(email, body, dc_data);
    } catch (error) {
      throw error;
    }
  }
}
