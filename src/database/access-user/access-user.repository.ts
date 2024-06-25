import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AccessUserEntity } from './access-user.entity';

@Injectable()
export class AccessUserRepository extends Repository<AccessUserEntity> {
  constructor(dataSource: DataSource) {
    super(AccessUserEntity, dataSource.createEntityManager());
  }
}
