import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { DocumentModule } from './document';
import { PageModule } from './page';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { randomUUID } from 'crypto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './database/user';
import { AccessUserEntity } from './database';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        timezone: '+09:00',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'asdf1234',
        database: 'gen_ap_pl',
        logging: true,
        autoLoadEntities: true,
        synchronize: true,
        entities: [UserEntity, AccessUserEntity],
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
