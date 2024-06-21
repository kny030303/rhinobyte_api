import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { AuthModule } from '../auth';
import { S3Module } from 'src/s3';

@Module({
  imports: [AuthModule, S3Module],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
