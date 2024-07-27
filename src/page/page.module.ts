import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { AuthModule } from '../auth';
import {
  DocumentLableMappngRepositoryModule,
  DocumentsRepositoryModule,
  PageLabelMappingRepositoryModule,
  PagesRepositoryModule,
} from '../database';
import { S3Module } from '../s3';

@Module({
  imports: [
    AuthModule,
    S3Module,
    PageLabelMappingRepositoryModule,
    DocumentLableMappngRepositoryModule,
    PagesRepositoryModule,
    DocumentsRepositoryModule,
  ],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
