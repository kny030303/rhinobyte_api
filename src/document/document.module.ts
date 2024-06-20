import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { AuthModule } from '../auth';

@Module({
  imports: [AuthModule],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
