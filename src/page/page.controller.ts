import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { PageService } from './page.service';
import {
  AccessTokenPayloads,
  AuthenticatedUser,
  AuthenticationGuard,
} from '../auth';
import {
  CreatePageRequestDto,
  CreatePageResponseDto,
  SearchPageRequestDto,
  SearchPageResposneDto,
} from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/documents/pages')
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
  async search(
    @Body() body: SearchPageRequestDto,
  ): Promise<SearchPageResposneDto> {
    return await this.pageService.search(body);
  }

  @ApiOperation({
    summary: '페이지 생성 API',
  })
  @ApiCreatedResponse({
    type: CreatePageResponseDto,
  })
  @Post()
  @UseInterceptors(FileInterceptor('page_data'))
  async crate(
    @AuthenticatedUser() user: AccessTokenPayloads,
    @UploadedFile() page_data: any,
    @Body() body: CreatePageRequestDto,
  ): Promise<CreatePageResponseDto> {
    try {
      const email = user.email;
      return await this.pageService.create(email, body, page_data);
    } catch (error) {
      throw error;
    }
  }
}
