import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { AuthModule } from '../auth';

@Module({
  imports: [AuthModule],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
