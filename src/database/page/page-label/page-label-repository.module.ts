import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageLabelEntity } from './page-label.entity';
import { PageLabelRepository } from './page-label.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PageLabelEntity])],
  providers: [PageLabelRepository],
  exports: [PageLabelRepository],
})
export class PageLabelRepositoryModule {}
