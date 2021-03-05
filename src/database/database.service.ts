import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import { CocktailItem } from 'src/cocktail/CocktailItem';
import * as uuid from 'uuid';
import * as path from 'path';

@Injectable()
export class DatabaseService {
    private db: lowdb.LowdbAsync<any>;

  constructor() {
    this.initDatabase();
  }


  private async initDatabase() {
    const adapter = new FileAsync( path.join((process.env.NODE_DATABASE_LOCATION || ''), './database.json'));
    this.db = await lowdb(adapter);
    this.db.defaults({ cocktails: [], stoplist: [] }).write();
  }


  /** Cocktails Section */
  async findAllCocktails(){
    const cocktails = await this.db.get('cocktails').value();
    return cocktails;
  }

  async addCocktail(cocktail: CocktailItem): Promise<CocktailItem>{
    const existingCocktails = await this.db.get('cocktails').value();

    const existingRecord = existingCocktails.find(x => x.id === cocktail.id);
    if (existingRecord){
      existingCocktails[existingCocktails.indexOf(existingRecord)] = cocktail;
    } else {
      cocktail.id = (Math.max(...existingCocktails.map(x => x.id)) || 0) + 1;
      existingCocktails.push(cocktail);
    }

    await this.db.set('cocktails', existingCocktails).write();
    return cocktail;
  }

  async deleteCocktail(cocktailId: number) {
    const existingCocktails = await this.db.get('cocktails').value();
    const newCocktails = existingCocktails.filter(cocktail => cocktail.id !== cocktailId);
    await this.db.set('cocktails', newCocktails).write();
    return;
  }



  /** Stoplist Section */
  async getStopList(){
    const stoplist = await this.db.get('stoplist').value();
    return stoplist;
  }
  
  async addToStopList(id: number): Promise<boolean>{
    const stoplist = await this.db.get('stoplist').value();
    stoplist.push(id);
    await this.db.set('stoplist', stoplist).write();
    return true;
  }

  async removeFromStopList(id: number): Promise<boolean>{
    const stoplist = await this.db.get('stoplist').value();
    const newStoplist = stoplist.filter( x => x !== id);
    await this.db.set('stoplist', newStoplist).write();
    return true;
  }
}