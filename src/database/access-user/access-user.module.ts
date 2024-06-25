import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessUserEntity } from './access-user.entity';
import { AccessUserRepository } from './access-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccessUserEntity])],
  providers: [AccessUserRepository],
  exports: [AccessUserRepository],
})
export class AccessUserRepositoryModule {}
