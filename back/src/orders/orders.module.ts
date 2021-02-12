import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { OrdersController } from './orders.controller'
import { Order } from './orders.entity'
import { OrdersService } from './orders.service'
import { OrderRepositoryProvider, OrderRepository } from './orders.repository'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'order'
    }),
    TypeOrmModule.forFeature([OrderRepository])],

  controllers: [OrdersController],
  providers: [OrdersService, OrderRepositoryProvider]

})
export class OrdersModule { }
