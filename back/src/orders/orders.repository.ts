import { Inject, Injectable, Logger, Optional, NotFoundException } from '@nestjs/common'
import { Order, CreateOrderDto } from './orders.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, DeleteResult, EntityRepository, Repository } from 'typeorm'

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  private readonly logger = new Logger(OrderRepository.name);

  public async createOrder (orderIn: CreateOrderDto): Promise<Order> {
    const newOrder = { ...orderIn, OC_TQTY: orderIn.OC_QTY, OC_STATUS: 'GO' }
    return this.save(newOrder)
  }

  public async read (cond): Promise<Order[]> {
    return this.find(cond)
  }

  public async updatOrder (order: Order): Promise<Order> {
    return this.save(order)
  }

  public async delete (order: Order): Promise<DeleteResult> {
    return this.delete(order)
  }
}

export const OrderRepositoryProvider = {
  provide: 'OrderRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(OrderRepository),
  inject: [Connection]
}
