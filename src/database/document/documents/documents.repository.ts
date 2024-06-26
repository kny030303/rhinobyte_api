import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DocumentsEntity } from './documents.entity';

@Injectable()
export class DocumentsRepository extends Repository<DocumentsEntity> {
  constructor(dataSource: DataSource) {
    super(DocumentsEntity, dataSource.createEntityManager());
  }
}
