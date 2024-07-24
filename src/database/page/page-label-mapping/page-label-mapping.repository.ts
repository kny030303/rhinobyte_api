import { Injectable } from '@nestjs/common';
import { PageLabelMappingEntity } from './page-label-mapping.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PageLabelMappingRepository extends Repository<PageLabelMappingEntity> {
  constructor(dataSource: DataSource) {
    super(PageLabelMappingEntity, dataSource.createEntityManager());
  }
}
