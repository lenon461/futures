import { Controller, Get, Post, Body, Put, Request, Param, Delete, Logger, UseGuards, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { Order } from './interfaces/order.interface'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { request } from 'express'

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor (
    private readonly ordersService: OrdersService,
    @InjectQueue('order') private readonly orderQueue: Queue
  ) { }

  private readonly logger = new Logger(OrdersController.name);

  @Post()
  @ApiOperation({ summary: 'Create Order' })
  @ApiResponse({ status: 201, description: 'Created' })
  async postOrder (@Request() request, @Body() createOrderDto: CreateOrderDto) {
    createOrderDto.total_qty = createOrderDto.qty
    createOrderDto.memberId = request.user.id
    const order = await this.ordersService.create(createOrderDto)
    this.logger.debug(createOrderDto.marketId.toString())
    this.logger.debug(request.user)
    this.orderQueue.add(createOrderDto.marketId.toString(), order, { attempts: 5, backoff: 1000 })
    return order
  }

  @Get()
  async getOrders (@Request() request, @Query('status') status): Promise<Order[]> {
    this.logger.debug('📢 getOrders')
    this.logger.debug(status)
    const orders = await this.ordersService.readAll({ memberId: request.user.id, status })

    return orders
  }

  @Delete('')
  async cancelOrder (@Body() cancelOrderDto: any) {
    this.orderQueue.add(cancelOrderDto.marketId.toString() + 'Cancel', cancelOrderDto, { attempts: 5, backoff: 1000 })
    return 'success'
  }

  @Delete('all/:id')
  async deleteOrderAll (@Param('id') memberId: string) {
    return this.ordersService.deleteAll(memberId)
  }
}
