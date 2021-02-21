import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from 'src/database/database.service';
import { CocktailItem } from './CocktailItem';

@ApiTags('Cocktails')
@Controller('')
export class CocktailController {
  constructor(private databaseService: DatabaseService) {}


  @ApiOkResponse({
    description: 'Cocktails received successfully'
  })
  @Get('/cocktails')
  async getAllCocktails(): Promise<{cocktails: CocktailItem[]}> {
    const cocktails = await this.databaseService.findAllCocktails();
    const stoplist = await this.databaseService.getStopList();
    const cocktailsWithoutStoplist = cocktails.filter(cocktail => !stoplist.includes(cocktail.id))
    return { cocktails: cocktailsWithoutStoplist };
  }


  @ApiOkResponse({
    description: 'Cocktail received successfully',
    type: CocktailItem
  })
  @Get('/cocktails/:id')
  async getCocktail(@Param('id') id: number): Promise<CocktailItem> {
    const cocktails = await this.databaseService.findAllCocktails();
    const cocktail = cocktails.find(x => x.id == id);
    return { ...cocktail };
  }

  @ApiBody({ type: CocktailItem })
  @Post('/cocktail')
  async addCocktail(@Body() cocktail: CocktailItem): Promise<CocktailItem>{
    const addingResult  = this.databaseService.addCocktail(cocktail);

    return addingResult;
  }

  @Delete('/cocktail/:id')
  async deleteCocktail(@Param('id') id: string): Promise<{success: true}> {
    await this.databaseService.deleteCocktail(parseInt(id));
    return { success: true };
  }
}
