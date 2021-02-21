import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CocktailModule } from './cocktail/cocktail.module';
import { StoplistModule } from './stoplist/stoplist.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CocktailModule, StoplistModule, DatabaseModule],
  providers: [AppService],
})
export class AppModule {}
