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
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import {
  AccessTokenPayloads,
  AuthenticatedUser,
  AuthenticationGuard,
} from '../auth';
import {
  CreateDocumentRequestDto,
  CreateDocumentResponseDto,
  GetDocumentResponseDto,
} from './dto';

@UseGuards(AuthenticationGuard)
@Controller('/documents')
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
    @UploadedFile() dc_data: any,
    @Body() body: CreateDocumentRequestDto,
  ): Promise<CreateDocumentResponseDto> {
    try {
      const email = user.email;
      return await this.documentService.create(email, body, dc_data);
    } catch (error) {
      throw error;
    }
  }
}
