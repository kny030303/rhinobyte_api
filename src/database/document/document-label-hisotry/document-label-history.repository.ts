import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DocumentLabelHistoryEntity } from './document-label-history.entity';

@Injectable()
export class DocumentLabelHistoryRepository extends Repository<DocumentLabelHistoryEntity> {
  constructor(dataSource: DataSource) {
    super(DocumentLabelHistoryEntity, dataSource.createEntityManager());
  }
}
