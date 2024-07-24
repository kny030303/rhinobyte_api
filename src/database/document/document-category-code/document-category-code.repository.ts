import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DocumentCategoryCodeEntity } from './document-category-code.entity';

@Injectable()
export class DocumentCategoryCodeRepository extends Repository<DocumentCategoryCodeEntity> {
  constructor(dataSource: DataSource) {
    super(DocumentCategoryCodeEntity, dataSource.createEntityManager());
  }
}
