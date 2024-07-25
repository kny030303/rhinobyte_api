import { Injectable } from '@nestjs/common';
import { SearchPageDto, SearchPageResposneDto } from './dto';
import {
  DocumentLabelMappingRepository,
  PageLabelMappingRepository,
  PagesEntity,
} from '../database';
import { In } from 'typeorm';

@Injectable()
export class PageService {
  constructor(
    private readonly pageLabelMappingRepository: PageLabelMappingRepository,
    private readonly documentLabelMappingRepository: DocumentLabelMappingRepository,
  ) {}

  async search(pageRequest: SearchPageDto): Promise<SearchPageResposneDto> {
    const { search } = pageRequest;
    const pages: PagesEntity[] = [];

    if (search.length > 0) {
      const documentLabelMapping =
        await this.documentLabelMappingRepository.find({
          relations: ['DOCUMENTS', 'DOCUMENT_LABEL'],
          where: [
            {
              DOCUMENTS: {
                FILE_NAME: In(search), // file_name으로 검색
              },
            },
            {
              DOCUMENT_LABEL: {
                CODE_KOR: In(search), // dc_label로 검색
              },
            },
          ],
        });
      const documentIds = documentLabelMapping.map((mapping) => mapping.DOC_ID);

      const pageLabelMapping = await this.pageLabelMappingRepository.find({
        relations: ['PAGE_LABEL'],
        where: [
          {
            PAGE_LABEL: In(search), // page_label로 검색
          },
          {
            PAGES: {
              DOC_ID: In(documentIds),
            },
          },
        ],
      });

      pages.push(...pageLabelMapping.map((mapping) => mapping.PAGES));
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
