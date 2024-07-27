import { Injectable } from '@nestjs/common';
import { SearchPageDto, SearchPageResposneDto } from './dto';
import {
  DocumentLabelMappingRepository,
  DocumentsRepository,
  PageLabelMappingRepository,
  PagesEntity,
  PagesRepository,
} from '../database';
import { In } from 'typeorm';

@Injectable()
export class PageService {
  constructor(
    private readonly pageLabelMappingRepository: PageLabelMappingRepository,
    private readonly documentLabelMappingRepository: DocumentLabelMappingRepository,
    private readonly documentsRepository: DocumentsRepository,
    private readonly pagesRepository: PagesRepository,
  ) {}

  async search(pageRequest: SearchPageDto): Promise<SearchPageResposneDto> {
    const { search } = pageRequest;
    const pages: PagesEntity[] = [];

    if (search.length > 0) {
      const documents = await this.documentsRepository.find({
        where: {
          FILE_NAME: In(search), // file_name으로 검색
        },
      });

      const documentLabelMapping =
        await this.documentLabelMappingRepository.find({
          relations: ['DOCUMENT_LABEL'],
          where: {
            DOCUMENT_LABEL: {
              CODE_KOR: In(search), // dc_label로 검색
            },
          },
        });

      const documentIds = [
        ...documentLabelMapping.map((mapping) => mapping.DOC_ID),
        ...documents.map((document) => document.ID),
      ];

      const pageLabelMapping = await this.pageLabelMappingRepository.find({
        relations: ['PAGE_LABEL'],
        where: {
          PAGE_LABEL: {
            CODE_KOR: In(search), // page_label로 검색
          },
        },
      });

      const pageIds = pageLabelMapping.map((mapping) => mapping.PAGE_ID);

      pages.push(
        ...(await this.pagesRepository.find({
          where: [
            {
              DOC_ID: In(documentIds),
            },
            {
              ID: In(pageIds),
            },
          ],
        })),
      );
    }

    return new SearchPageResposneDto({
      message: 'SUCCESS',
      total_page: pages.length,
      page_list: pages.map((page) => ({
        dc_id: page.DOC_ID,
        page_id: page.ID,
        page_no: page.PAGE_NO,
        created_at: page.CREATED_AT.toString(),
      })),
    });
  }
}
