import { Controller, Get, Post, Body, Put, Request, Param, Delete, Logger, UseGuards, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { OrdersService } from './orders.service'
import { CreateOrderDto, Order } from './orders.entity'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor (
    private readonly ordersService: OrdersService,
    @InjectQueue('order') private readonly orderQueue: Queue
  ) { }

  private readonly logger = new Logger(OrdersController.name);

  @Get()
  @ApiOperation({ summary: 'Get All Orders' })
  async getOrders (@Request() request, @Query('status') status): Promise<Order[]> {
    this.logger.debug(request.user.id)
    const orders = await this.ordersService.findAll({ MIDX: request.user.id })
    return orders
  }

  @Post()
  @ApiOperation({ summary: 'Create Order' })
  @ApiResponse({ status: 201, description: 'Created' })
  async postOrder (@Request() request, @Body() orderIn: CreateOrderDto) {
    const orderOut = await this.ordersService.save(orderIn)
    // this.orderQueue.add(createOrderDto.marketId.toString(), order, {attempts: 5, backoff: 1000})
    return orderOut
  }

  @Delete('')
  async cancelOrder (@Body() cancelOrderDto: any) {
    this.orderQueue.add(cancelOrderDto.marketId.toString() + 'Cancel', cancelOrderDto, { attempts: 5, backoff: 1000 })
    return 'success'
  }

  // @Delete('all/:id')
  // async deleteOrderAll(@Param('id') memberId: string) {
  //   return this.ordersService.deleteAll(memberId);
  // }
}
