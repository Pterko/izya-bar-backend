import { Module } from '@nestjs/common';
import { CocktailService } from './cocktail.service';
import { CocktailController } from './cocktail.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CocktailService],
  controllers: [CocktailController]
})
export class CocktailModule {}
