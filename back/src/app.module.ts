
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger';
import { OrdersModule } from './orders/orders.module';
import { SummonersModule } from './summoners/summoners.module';

@Module({
  imports: [
     OrdersModule,
     SummonersModule, ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}