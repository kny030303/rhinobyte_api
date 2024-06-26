import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DocumentLabelEntity } from './document-label.entity';

@Injectable()
export class DocumentLabelRepository extends Repository<DocumentLabelEntity> {
  constructor(dataSource: DataSource) {
    super(DocumentLabelEntity, dataSource.createEntityManager());
  }
}
