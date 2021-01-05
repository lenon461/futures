import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { SummonersModule } from './summoners/summoners.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
     OrdersModule,
     SummonersModule, ],
})

export class AppModule { }
