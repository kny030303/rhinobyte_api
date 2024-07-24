import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DocumentLabelMappingRepository extends Repository<DocumentLabelMappingRepository> {
  constructor(dataSource: DataSource) {
    super(DocumentLabelMappingRepository, dataSource.createEntityManager());
  }
}
