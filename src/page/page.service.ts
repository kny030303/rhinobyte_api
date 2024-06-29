import { Injectable } from '@nestjs/common';
import { PageListDto, SearchPageDto, SearchPageResposneDto } from './dto';
import {
  DocumentLabelRepository,
  DocumentsRepository,
  PageLabelRepository,
  PagesRepository,
} from '../database';
import { In } from 'typeorm';

@Injectable()
export class PageService {
  constructor(
    private readonly pagesRepository: PagesRepository,
    private readonly pageLabelRepository: PageLabelRepository,
    private readonly documentsRepository: DocumentsRepository,
    private readonly documentLabelRepository: DocumentLabelRepository,
  ) {}

  async search(pageRequest: SearchPageDto): Promise<SearchPageResposneDto> {
    const searchCriteria = {
      documentIdList: [],
      pageIdList: [],
    };

    // TODO: file_name으로  검색
    if (pageRequest.file_name_list.length > 0) {
      const documents = await this.documentsRepository.find({
        where: {
          FILE_NAME: In(pageRequest.file_name_list),
        },
      });

      searchCriteria.documentIdList.push(
        documents.map((document) => document.DOC_ID),
      );
    }

    // TODO: page_label로 검색
    if (pageRequest.page_label_list.length > 0) {
      const pages = await this.pageLabelRepository.find({
        where: {
          L1_CODE: In(pageRequest.page_label_list),
          L2_CODE: In(pageRequest.page_label_list),
          L3_CODE: In(pageRequest.page_label_list),
          L4_CODE: In(pageRequest.page_label_list),
          L5_CODE: In(pageRequest.page_label_list),
        },
      });

      searchCriteria.pageIdList.push(pages.map((page) => page.PAGE_ID));
    }

    // TODO: dc_label_list로 검색
    if (pageRequest.dc_label_list.length > 0) {
      const documentLabels = await this.documentLabelRepository.find({
        where: {
          TYPE_CODE: In(pageRequest.dc_label_list),
        },
      });

      searchCriteria.documentIdList.push(
        documentLabels.map((document) => document.DOC_ID),
      );
    }

    const pages = await this.pagesRepository.find({
      where: [
        { DOC_ID: In(searchCriteria.documentIdList) },
        { PAGE_ID: In(searchCriteria.pageIdList) },
      ],
    });

    const page_list: PageListDto[] = pages.map((page) => ({
      dc_id: page.DOC_ID,
      page_id: page.PAGE_ID,
      page_no: page.PAGE_NO,
      created_at: page.CREATED_AT.toString(),
    }));

    // TODO: 검색 조건에 맞게 페이지를 검색합니다.
    return new SearchPageResposneDto({
      message: 'SUCCESS',
      total_page: pages.length,
      page_list,
    });
  }
}
