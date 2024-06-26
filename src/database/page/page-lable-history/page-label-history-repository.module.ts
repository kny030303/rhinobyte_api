import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageLabelHistoryEntity } from './page-label-history.entity';
import { PageLabelHistoryRepository } from './page-label-history.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PageLabelHistoryEntity])],
  providers: [PageLabelHistoryRepository],
  exports: [PageLabelHistoryRepository],
})
export class PageLabelHistoryRepositoryModule {}
