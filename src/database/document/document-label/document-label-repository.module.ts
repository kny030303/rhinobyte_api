import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentLabelEntity } from './document-label.entity';
import { DocumentLabelRepository } from './document-label.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentLabelEntity])],
  providers: [DocumentLabelRepository],
  exports: [DocumentLabelRepository],
})
export class DocumentLabelRepositoryModule {}
