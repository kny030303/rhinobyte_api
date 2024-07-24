import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageLabelMappingEntity } from './page-label-mapping.entity';
import { PageLabelMappingRepository } from './page-label-mapping.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PageLabelMappingEntity])],
  providers: [PageLabelMappingRepository],
  exports: [PageLabelMappingRepository],
})
export class PageLabelMappingRepositoryModule {}
