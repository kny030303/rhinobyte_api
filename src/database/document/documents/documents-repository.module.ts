import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsEntity } from './documents.entity';
import { DocumentsRepository } from './documents.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentsEntity])],
  providers: [DocumentsRepository],
  exports: [DocumentsRepository],
})
export class DocumentsRepositoryModule {}
