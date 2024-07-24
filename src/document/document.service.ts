import { Injectable } from '@nestjs/common';
import {
  createDocumentDto,
  CreateDocumentResponseDto,
  ResponseDocumentDto,
  GetDocumentResponseDto,
} from './dto';
import { S3Service } from '../s3';
import { DocumentLabelRepository, DocumentsRepository } from '../database';

@Injectable()
export class DocumentService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly documentsRepository: DocumentsRepository,
    private readonly documentLabelRepository: DocumentLabelRepository,
  ) {}

  async getByEmail(email: string): Promise<GetDocumentResponseDto> {
    // email로 document 조회
    const documents = await this.documentsRepository.find({
      where: {
        CREATED_BY: email,
      },
      relations: ['DOCUMENT_LABELS'],
    });

    const response: GetDocumentResponseDto = {
      message: 'SUCCESS',
      dc_list: documents.map(
        (document): ResponseDocumentDto => ({
          dc_id: document.ID,
          dc_name: document.FILE_NAME,
          file_path: document.FILE_PATH,
          category: document.DOC_CATEGORY,
          total_page: document.TOTAL_PAGES,
          label_list: [],
        }),
      ),
    };

    return new GetDocumentResponseDto(response);
  }

  async createDocument(
    email: string,
    document: createDocumentDto,
    data: any,
  ): Promise<CreateDocumentResponseDto> {
    const {
      dc_name,
      dc_label_list,
      category,
      client,
      business,
      location,
      address,
      total_page,
    } = document;

    // s3에 document 저장
    const file_path = await this.s3Service.uploadPdfFile({
      file_name: `${category}/${dc_name}`,
      buffer: data,
    });

    const documentEntity = await this.documentsRepository.create({
      DOC_CATEGORY: category,
      FILE_NAME: dc_name,
      FILE_PATH: file_path,
      TOTAL_PAGES: total_page,
      CLIENT: client,
      BUSINESS: business,
      LOCATION: location,
      ADDRESS: address,
      CREATED_BY: email,
      LAST_MODIFIED_BY: email,
    });

    // DB에 document 저장
    await this.documentsRepository.save(documentEntity);

    for (const dc_label of dc_label_list) {
      // DB에 document label 저장
      // await this.documentLabelRepository.save({
      //   DOC_ID: documentEntity.ID,
      //   TYPE_CODE: dc_label,
      // });
      // DB에 document label history 저장
      // await this.documentLabelHistoryRepository.save({
      //   DOC_ID: documentEntity.ID,
      //   TYPE_CODE: dc_label,
      //   LABELER_ID: email,
      // });
    }

    return new CreateDocumentResponseDto({
      dc_id: documentEntity.ID,
      file_path,
      message: 'SUCCESS',
    });
  }
}
