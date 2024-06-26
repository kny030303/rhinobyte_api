import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PageLabelEntity } from './page-label.entity';

@Injectable()
export class PageLabelRepository extends Repository<PageLabelEntity> {
  constructor(dataSource: DataSource) {
    super(PageLabelEntity, dataSource.createEntityManager());
  }
}
