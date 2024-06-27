import { Injectable } from '@nestjs/common';
import {
  createDocumentDto,
  CreateDocumentResponseDto,
  ResponseDocumentDto,
  GetDocumentResponseDto,
} from './dto';
import { S3Service } from '../s3';
import {
  DocumentLabelHistoryRepository,
  DocumentLabelRepository,
  DocumentsRepository,
  PageLabelHistoryRepository,
  PageLabelRepository,
  PagesRepository,
} from '../database';

@Injectable()
export class DocumentService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly documentsRepository: DocumentsRepository,
    private readonly documentLabelRepository: DocumentLabelRepository,
    private readonly documentLabelHistoryRepository: DocumentLabelHistoryRepository,
    private readonly pagesRepository: PagesRepository,
    private readonly pageLabelRepository: PageLabelRepository,
    private readonly pageLabelHistoryRepository: PageLabelHistoryRepository,
  ) {}

  async getByEmail(email: string): Promise<GetDocumentResponseDto> {
    // TODO: email로 document 조회
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
          dc_id: document.DOC_ID,
          dc_name: document.FILE_NAME,
          file_path: document.FILE_PATH,
          category: document.DOC_CATEGORY,
          total_page: document.TOTAL_PAGES,
          label_list: document.DOCUMENT_LABELS.map((label) => label.TYPE_CODE),
        }),
      ),
    };

    return new GetDocumentResponseDto(response);
  }

  async createDocument(
    email: string,
    document: createDocumentDto,
    data: Express.Multer.File,
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
      page_list,
    } = document;

    // TODO: s3에 document 저장
    const file_path = await this.s3Service.uploadPdfFile({
      file_name: `${category}/${dc_name}`,
      buffer: data,
    });

    // TODO: DB에 document 저장
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
    await this.documentsRepository.save(documentEntity);

    for (const dc_label of dc_label_list) {
      // TODO: DB에 document label 저장
      await this.documentLabelRepository.save({
        DOC_ID: documentEntity.DOC_ID,
        TYPE_CODE: dc_label,
      });

      // TODO: DB에 document label history 저장
      await this.documentLabelHistoryRepository.save({
        DOC_ID: documentEntity.DOC_ID,
        TYPE_CODE: dc_label,
        LABELER_ID: email,
      });
    }

    for (let i = 0; i < total_page; i++) {
      // TODO: DB에 page 저장
      const label_list = page_list[i].label_list;
      const page = await this.pagesRepository.save({
        DOC_ID: documentEntity.DOC_ID,
        PAGE_NO: i + 1,
        CREATED_BY: email,
        LAST_MODIFIED_BY: email,
      });

      // TODO: DB에 page label 저장
      await this.pageLabelRepository.save({
        PAGE_ID: page.PAGE_ID,
        L1_CODE: label_list[0] ?? null,
        L2_CODE: label_list[1] ?? null,
        L3_CODE: label_list[2] ?? null,
        L4_CODE: label_list[3] ?? null,
        L5_CODE: label_list[4] ?? null,
        LABEL_YN: label_list[0] ? 'Y' : 'N',
      });

      await this.pageLabelHistoryRepository.save({
        PAGE_ID: page.PAGE_ID,
        L1_CODE: label_list[0] ?? null,
        L2_CODE: label_list[1] ?? null,
        L3_CODE: label_list[2] ?? null,
        L4_CODE: label_list[3] ?? null,
        L5_CODE: label_list[4] ?? null,
        LABELER_ID: email,
      });
    }

    return new CreateDocumentResponseDto({
      dc_id: documentEntity.DOC_ID,
      file_path,
      message: 'SUCCESS',
    });
  }
}
