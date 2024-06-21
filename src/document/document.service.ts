import { Injectable } from '@nestjs/common';
import { createDocumentDto, CreateDocumentResponseDto } from './dto';
import { S3Service } from '../s3';

@Injectable()
export class DocumentService {
  constructor(private readonly s3Service: S3Service) {}
  async createDocument(
    document: createDocumentDto,
  ): Promise<CreateDocumentResponseDto> {
    const {
      file_name,
      dc_label,
      category,
      client,
      business,
      location,
      address,
      total_page,
      page_list,
      dc_data,
    } = document;

    // TODO: s3에 document 저장
    const file_path = await this.s3Service.uploadPdfFile({
      file_name,
      buffer: dc_data,
    });

    // TODO: document 저장

    for (const { label_list } of page_list) {
      // TODO: label, page_no, 문서_id를 LABEL 테이블에 저장
    }

    return new CreateDocumentResponseDto({
      dc_id: 0,
      file_path,
      message: 'SUCCESS',
    });
  }
}
