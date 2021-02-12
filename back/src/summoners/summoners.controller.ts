import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateSummonerDto, Summoner } from './summoners.entity'
import { SummonersService } from './summoners.service'
@ApiTags('summoners')
@Controller('summoners')
export class SummonersController {
  constructor (private readonly summonersService: SummonersService) { }
    private readonly logger = new Logger(SummonersController.name);

    @Post()
    @ApiOperation({ summary: 'Create Summoner' })
    @ApiResponse({ status: 200, description: 'The found record' })
    @ApiResponse({ status: 201, description: 'Created' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async postSummoner (@Body() summonerIn: CreateSummonerDto) {
      // createSummonerDto = {
      //     "id": "PuzxQYhd76OEtLo55Y2TjmLilKnfxCdgg1JTU2YaNw57Jk4",
      //     "accountId": "U3QyfPOkmQAtRT3zrN4RnPDmgXvcnxwHGhV3QjM4mIttHOM",
      //     "puuid": "PaTPbAn4HcBupbRkvzgW0d_PneUpqQjCPKlnsPJIHjF9gO_il4ygSMtRXzP0vB23N53plCys8dbN5A",
      //     "name": "가나라마아바",
      //     "profileIconId": 20,
      //     "revisionDate": 1604977403000,
      //     "summonerLevel": 81
      // }
      const summonerOut = await this.summonersService.save(summonerIn)
      return summonerOut
    }

    @Get()
    async getSummoners (): Promise<Summoner[]> {
      const summoners = await this.summonersService.findAll({})
      return summoners
    }

  // @Get(':name')
  // async getSummonerOne (@Param('name') name: string): Promise<Summoner> {
  //   return this.summonersService.readOne(name)
  // }
}
