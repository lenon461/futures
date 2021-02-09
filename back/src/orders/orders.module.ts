import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { OrdersController } from './orders.controller'
import { ordersProviders } from './orders.provider'
import { OrdersService } from './orders.service'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'order'
    }),
    DatabaseModule, UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService, ...ordersProviders]
})
export class OrdersModule { }
