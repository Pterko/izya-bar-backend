import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from 'src/database/database.service';
import { StopList } from './StopList';
import { EditStoplistDTO } from './stoplist.dto';

@ApiTags('StopList')
@Controller('stoplist')
export class StoplistController {
  constructor(private databaseService: DatabaseService) {}


  @Get('/')
  async getStoplist(): Promise<{ids: StopList}>{
    const stoplist = await this.databaseService.getStopList();
    return { ids: stoplist } ;
  }

  @ApiBody({ type: EditStoplistDTO })
  @Post('/add')
  async addToStopList(@Body('id') bodyId: number): Promise<{success: boolean}>{
    if (!bodyId)
      return {success: false};
    const addResult = await this.databaseService.addToStopList(bodyId);
    
    return {success: addResult};
  }

  @ApiBody({ type: EditStoplistDTO })
  @Post('/remove')
  async removeFromStopList(@Body('id') bodyId: number): Promise<{success: boolean}>{
    if (!bodyId)
      return {success: false};

    const addResult = await this.databaseService.removeFromStopList(bodyId);
    
    return {success: addResult};
  }
}
