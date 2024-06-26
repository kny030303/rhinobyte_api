import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageLabelCodeEntity } from './page-label-code.entity';
import { PageLabelCodeRepository } from './page-label-code.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PageLabelCodeEntity])],
  providers: [PageLabelCodeRepository],
  exports: [PageLabelCodeRepository],
})
export class PageLabelCodeRepositoryModule {}
