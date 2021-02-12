import { Inject, Injectable, Logger, Optional, NotFoundException } from '@nestjs/common'
import { Asset, CreateAssetDto } from './assets.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, DeleteResult, EntityRepository, Repository } from 'typeorm'

@EntityRepository(Asset)
export class AssetRepository extends Repository<Asset> {
  private readonly logger = new Logger(AssetRepository.name);

  public async createAsset (MIDX, SIDX): Promise<Asset> {
    const newAsset = { MIDX, SIDX, TOTAL_AMOUNT: 0, USING_AMOUNT: 0 }
    return this.save(newAsset)
  }

  public async read (cond): Promise<Asset[]> {
    return this.find(cond)
  }

  public async updatAsset (asset: Asset): Promise<Asset> {
    return this.save(asset)
  }

  public async delete (asset: Asset): Promise<DeleteResult> {
    return this.delete(asset)
  }
}

export const AssetRepositoryProvider = {
  provide: 'AssetRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(AssetRepository),
  inject: [Connection]
}
