import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OrdersController } from './orders.controller';
import { ordersProviders } from './orders.provider';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'orders',
    }),
    DatabaseModule],
  controllers: [OrdersController],
  providers: [OrdersService,  ...ordersProviders]
})
export class OrdersModule { }
