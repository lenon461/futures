
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger';
import { OrdersModule } from './orders/orders.module';
import { SummonersModule } from './summoners/summoners.module';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
     OrdersModule,
     SummonersModule, 
    ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}