import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentCategoryCodeEntity } from './document-category-code.entity';
import { DocumentCategoryCodeRepository } from './document-category-code.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentCategoryCodeEntity])],
  providers: [DocumentCategoryCodeRepository],
  exports: [DocumentCategoryCodeRepository],
})
export class DocumentCategoryCodeRepositoryModule {}
