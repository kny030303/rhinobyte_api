import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentLabelMappingEntity } from './document-label-mapping.entity';
import { DocumentLabelMappingRepository } from './document-label-mapping.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentLabelMappingEntity])],
  providers: [DocumentLabelMappingRepository],
  exports: [DocumentLabelMappingRepository],
})
export class DocumentLableMappngRepositoryModule {}
