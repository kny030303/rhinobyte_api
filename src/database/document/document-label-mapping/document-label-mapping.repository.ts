import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DocumentLabelEntity } from '../document-label/document-label.entity';
import { DocumentLabelMappingEntity } from './document-label-mapping.entity';

@Injectable()
export class DocumentLabelMappingRepository extends Repository<DocumentLabelMappingEntity> {
  constructor(dataSource: DataSource) {
    super(DocumentLabelMappingEntity, dataSource.createEntityManager());
  }
}
