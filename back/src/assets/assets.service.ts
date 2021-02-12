import { Inject, Injectable, Logger } from '@nestjs/common'
import { CreateAssetDto, Asset } from './assets.entity'
import { AssetRepository } from './assets.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { SummonersService } from 'src/summoners/summoners.service'
@Injectable()
export class AssetsService {
  constructor (

    @InjectRepository(AssetRepository)
    private readonly assetRepository: AssetRepository,
    private readonly summonersService: SummonersService,
  ) { }

    private readonly logger = new Logger(AssetsService.name);
    
    async addWallet (midx: any): Promise<void> {
      const SIDXs = await this.summonersService.getAllSIDXs()
      // const asset = await this.assetRepository.createAsset(midx, sidx)
      SIDXs.forEach((sidx) => {
        console.log(sidx)
        this.assetRepository.createAsset(midx, sidx)
      })
      return ;
    }

    async findAll (params) {
      const asset = await this.assetRepository.read(params)
      return asset
    }
}
