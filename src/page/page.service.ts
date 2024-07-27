import { Injectable } from '@nestjs/common';
import {
  CreatePageResponseDto,
  SearchPageRequestDto,
  SearchPageResposneDto,
} from './dto';
import {
  DocumentLabelMappingRepository,
  DocumentsRepository,
  PageLabelMappingRepository,
  PagesEntity,
  PagesRepository,
} from '../database';
import { In, DataSource, Like } from 'typeorm';
import { CreatePageRequestDto } from './dto/create-page.request.dto';
import { S3Service } from '../s3';

@Injectable()
export class PageService {
  constructor(
    private dataSource: DataSource,
    private readonly s3Service: S3Service,
    private readonly pageLabelMappingRepository: PageLabelMappingRepository,
    private readonly documentLabelMappingRepository: DocumentLabelMappingRepository,
    private readonly documentsRepository: DocumentsRepository,
    private readonly pagesRepository: PagesRepository,
  ) {}

  async search(
    pageRequest: SearchPageRequestDto,
  ): Promise<SearchPageResposneDto> {
    const { search } = pageRequest;
    const pages: PagesEntity[] = [];

    if (search.length > 0) {
      const documents = await this.documentsRepository.find({
        where: search.map((value) => ({
          FILE_NAME: Like(`%${value}%`),
        })),
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

  async create(
    email: string,
    page: CreatePageRequestDto,
    data: any,
  ): Promise<CreatePageResponseDto> {
    const { dc_id, page_label_list, page_label_yn, page_no, width, height } =
      page;

    // s3에 page 저장
    const file_path = await this.s3Service.uploadJpgFile({
      file_name: `pages/${dc_id}/page_${page_no}`,
      buffer: data,
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const pageEntity = await this.pagesRepository.create({
        DOC_ID: dc_id,
        PAGE_NO: page_no,
        LABEL_YN: page_label_yn === 'true',
        WIDTH: width,
        HEIGHT: height,
        CREATED_BY: email,
        LAST_MODIFIED_BY: email,
      });

      await queryRunner.manager.save(pageEntity);

      for (const page_label of page_label_list) {
        const pageLabellMappingEntity =
          await this.pageLabelMappingRepository.create({
            PAGE_ID: page_no,
            LABEL_ID: page_label,
            CREATED_BY: email,
            LAST_MODIFIED_BY: email,
          });
        await queryRunner.manager.save(pageLabellMappingEntity);
      }
      await queryRunner.commitTransaction();

      return new CreatePageResponseDto({
        page_id: pageEntity.ID,
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
