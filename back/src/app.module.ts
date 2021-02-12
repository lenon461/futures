
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoggerMiddleware } from './middlewares/logger'
import { OrdersModule } from './orders/orders.module'
import { SummonersModule } from './summoners/summoners.module'
import { AssetsModule } from './assets/assets.module'
import { BullModule } from '@nestjs/bull'
import { AuthModule } from './auth/auth.module'
import { MembersModule } from './members/members.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './orders/orders.entity'
import { Member } from './members/members.entity'
import { Asset } from './assets/assets.entity'
import { Summoner } from './summoners/summoners.entity'
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),
    // mongodb+srv://seonjl:seonjl@cluster0.gbwnb.mongodb.net/futures
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://seonjl:seonjl@cluster0.gbwnb.mongodb.net/futures',
      // host: 'cluster0.gbwnb.mongodb.net',
      // database: 'futures',
      // username: 'seonjl',
      // password: 'seonjl',
      autoLoadEntities: true,
      entities: [Order, Asset, Member, Summoner],
      synchronize: true
    }),
    OrdersModule,
    SummonersModule,
    AuthModule,
    MembersModule,
    AssetsModule,
  ]
})

export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
  }
}
