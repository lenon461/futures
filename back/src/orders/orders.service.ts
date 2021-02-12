import { Inject, Injectable, Logger } from '@nestjs/common'
import { CreateOrderDto, Order } from './orders.entity'
import { OrderRepository } from './orders.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
@Injectable()
export class OrdersService {
  constructor (

    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository
  ) { }

    private readonly logger = new Logger(OrdersService.name);

    async save (orderIn: CreateOrderDto): Promise<Order> {
      const order = await this.orderRepository.createOrder(orderIn)
      return order
    }

    async findAll (params) {
      const order = await this.orderRepository.read(params)
      return order
    }
}
