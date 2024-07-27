import { Injectable } from '@nestjs/common';
import {
  CreateDocumentRequestDto,
  CreateDocumentResponseDto,
  DocumentResponseDto,
  GetDocumentResponseDto,
} from './dto';
import { S3Service } from '../s3';
import {
  DocumentLabelMappingRepository,
  DocumentsRepository,
} from '../database';
import { DataSource } from 'typeorm';

@Injectable()
export class DocumentService {
  constructor(
    private dataSource: DataSource,
    private readonly s3Service: S3Service,
    private readonly documentsRepository: DocumentsRepository,
    private readonly documentLabelMappingRepository: DocumentLabelMappingRepository,
  ) {}

  async getByEmail(email: string): Promise<GetDocumentResponseDto> {
    const response: DocumentResponseDto[] = [];

    // email로 document 조회
    const documents = await this.documentsRepository.find({
      where: {
        CREATED_BY: email,
      },
    });

    // document label 조회
    for (const document of documents) {
      const documentLabelMapping =
        await this.documentLabelMappingRepository.find({
          relations: ['DOCUMENT_LABEL'],
          where: {
            DOC_ID: document.ID,
          },
        });

      const label_ids = documentLabelMapping.map((mapping) => mapping.LABEL_ID);

      response.push({
        dc_id: document.ID,
        dc_name: document.FILE_NAME,
        file_path: document.FILE_PATH,
        category: document.DOC_CATEGORY,
        total_page: document.TOTAL_PAGES,
        label_list: label_ids,
        document_label_yn: document.LABEL_YN,
      });
    }

    return new GetDocumentResponseDto({
      message: 'SUCCESS',
      dc_list: response,
    });
  }

  async create(
    email: string,
    document: CreateDocumentRequestDto,
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
      document_label_yn,
    } = document;

    // s3에 document 저장
    const file_path = await this.s3Service.uploadPdfFile({
      file_name: `${category}/${dc_name}`,
      buffer: data,
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const documentEntity = await this.documentsRepository.create({
        DOC_CATEGORY: category,
        FILE_NAME: dc_name,
        FILE_PATH: file_path,
        TOTAL_PAGES: total_page,
        CLIENT: client,
        BUSINESS: business,
        LOCATION: location,
        ADDRESS: address,
        LABEL_YN: document_label_yn === 'true',
        CREATED_BY: email,
        LAST_MODIFIED_BY: email,
      });

      // DB에 document 저장
      await queryRunner.manager.save(documentEntity);

      for (const dc_label of dc_label_list) {
        const documentLabelMappingEntity =
          await this.documentLabelMappingRepository.create({
            DOC_ID: documentEntity.ID,
            LABEL_ID: dc_label,
            CREATED_BY: email,
            LAST_MODIFIED_BY: email,
          });
        await queryRunner.manager.save(documentLabelMappingEntity);
      }

      await queryRunner.commitTransaction();

      return new CreateDocumentResponseDto({
        dc_id: documentEntity.ID,
        file_path,
        message: 'SUCCESS',
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
