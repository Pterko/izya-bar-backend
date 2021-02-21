import { Module } from '@nestjs/common';
import { StoplistService } from './stoplist.service';
import { StoplistController } from './stoplist.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [StoplistService],
  controllers: [StoplistController]
})
export class StoplistModule {}
