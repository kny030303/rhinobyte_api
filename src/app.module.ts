import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { randomUUID } from 'crypto';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserEntity,
  AccessUserEntity,
  DocumentLabelEntity,
  DocumentLabelMappingEntity,
  DocumentsEntity,
} from './database';
import { AuthModule } from './auth';
import { DocumentModule } from './document';
import { PageModule } from './page';
import { UserModule } from './user';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        timezone: '+09:00',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        logging: true,
        autoLoadEntities: true,
        synchronize: false,
        entities: [
          UserEntity,
          AccessUserEntity,
          DocumentsEntity,
          DocumentLabelEntity,
          DocumentLabelMappingEntity,
        ],
      }),
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: randomUUID,
      },
    }),
    AuthModule,
    PageModule,
    DocumentModule,
    UserModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
