import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesEntity } from './pages.entity';
import { PagesRepository } from './pages.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PagesEntity])],
  providers: [PagesRepository],
  exports: [PagesRepository],
})
export class PagesRepositoryModule {}
