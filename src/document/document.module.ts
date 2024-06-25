import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { AuthModule } from '../auth';
import { S3Module } from '../s3';
import { DocumentController } from './document.controller';

@Module({
  imports: [AuthModule, S3Module],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
