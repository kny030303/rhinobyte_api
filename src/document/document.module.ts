import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { AuthModule } from '../auth';
import { S3Module } from '../s3';
import { DocumentController } from './document.controller';
import {
  DocumentLableMappngRepositoryModule,
  DocumentsRepositoryModule,
} from '../database';

@Module({
  imports: [
    AuthModule,
    S3Module,
    DocumentsRepositoryModule,
    DocumentLableMappngRepositoryModule,
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
