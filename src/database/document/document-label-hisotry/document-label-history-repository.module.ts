import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentLabelHistoryEntity } from './document-label-history.entity';
import { DocumentLabelHistoryRepository } from './document-label-history.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentLabelHistoryEntity])],
  providers: [DocumentLabelHistoryRepository],
  exports: [DocumentLabelHistoryRepository],
})
export class DocumentLabelHistoryRepositoryModule {}
