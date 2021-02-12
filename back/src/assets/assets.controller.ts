import { Controller, Get, Post, Body, Put, Request, Param, Delete, Logger, UseGuards, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AssetsService } from './assets.service'
import { CreateAssetDto, Asset } from './assets.entity'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { SummonersService } from 'src/summoners/summoners.service'

@UseGuards(JwtAuthGuard)
@Controller('assets')
export class AssetsController {
  constructor (
    private readonly assetsService: AssetsService,
    @InjectQueue('asset') private readonly assetQueue: Queue
  ) { }

  private readonly logger = new Logger(AssetsController.name);

  @Get()
  @ApiOperation({ summary: 'Get All Assets' })
  async getAssets (@Request() request, @Query('status') status): Promise<Asset[]> {
    const assets = await this.assetsService.findAll({ MIDX: request.user.id })
    return assets
  }

  // @Post()
  // @ApiOperation({ summary: 'Create Asset' })
  // @ApiResponse({ status: 201, description: 'Created' })
  // async postAsset (@Request() request, @Body() assetIn: CreateAssetDto) {
  //   const assetOut = await this.assetsService.save(assetIn)
  //   // this.assetQueue.add(createAssetDto.marketId.toString(), asset, {attempts: 5, backoff: 1000})
  //   return assetOut
  // }

  // @Delete('')
  // async cancelAsset (@Body() cancelAssetDto: any) {
  //   this.assetQueue.add(cancelAssetDto.marketId.toString() + 'Cancel', cancelAssetDto, { attempts: 5, backoff: 1000 })
  //   return 'success'
  // }

  // @Delete('all/:id')
  // async deleteAssetAll(@Param('id') memberId: string) {
  //   return this.assetsService.deleteAll(memberId);
  // }
}
