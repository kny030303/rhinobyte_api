import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { DocumentModule } from './document';
import { PageModule } from './page';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
