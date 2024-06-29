import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { DocumentModule } from './document';
import { PageModule } from './page';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { randomUUID } from 'crypto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './database/user';
import { AccessUserEntity, PageLabelEntity, PagesEntity } from './database';
import {
  DocumentLabelEntity,
  DocumentLabelHistoryEntity,
  DocumentsEntity,
} from './database/document';

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
        synchronize: true,
        entities: [
          UserEntity,
          AccessUserEntity,
          DocumentsEntity,
          DocumentLabelEntity,
          DocumentLabelHistoryEntity,
          PagesEntity,
          PageLabelEntity,
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
    DocumentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
