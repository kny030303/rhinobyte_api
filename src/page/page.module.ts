import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { AuthModule } from '../auth';
import {
  DocumentLabelRepositoryModule,
  DocumentsRepositoryModule,
  PageLabelRepositoryModule,
  PagesRepositoryModule,
} from 'src/database';

@Module({
  imports: [
    AuthModule,
    PagesRepositoryModule,
    PageLabelRepositoryModule,
    DocumentsRepositoryModule,
    DocumentLabelRepositoryModule,
  ],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
