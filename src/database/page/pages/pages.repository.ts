import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PagesEntity } from './pages.entity';

@Injectable()
export class PagesRepository extends Repository<PagesEntity> {
  constructor(dataSource: DataSource) {
    super(PagesEntity, dataSource.createEntityManager());
  }
}
