import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PageLabelHistoryEntity } from './page-label-history.entity';

@Injectable()
export class PageLabelHistoryRepository extends Repository<PageLabelHistoryEntity> {
  constructor(dataSource: DataSource) {
    super(PageLabelHistoryEntity, dataSource.createEntityManager());
  }
}
