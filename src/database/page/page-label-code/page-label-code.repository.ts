import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PageLabelCodeEntity } from './page-label-code.entity';

@Injectable()
export class PageLabelCodeRepository extends Repository<PageLabelCodeEntity> {
  constructor(dataSource: DataSource) {
    super(PageLabelCodeEntity, dataSource.createEntityManager());
  }
}
