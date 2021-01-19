import { Controller, Get, Post, Body, Put, Param, Delete, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './interfaces/order.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService, @InjectQueue('order') private readonly orderQueue: Queue) { }
  private readonly logger = new Logger(OrdersController.name);

  @Post()
  @ApiOperation({summary: 'Create Order'})
  @ApiResponse({status: 201, description: 'Created'})
  async postOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    this.logger.debug(createOrderDto.marketId.toString())
    this.orderQueue.add(createOrderDto.marketId.toString(), order, {attempts: 5, backoff: 1000})
    return order
  }

  @Get()
  async getOrderAll(): Promise<Order[]> {
      const orders = await this.ordersService.readAll()
      return orders
  }
  
  @Get(':id')
  async getOrderOne(@Param('id') id: string): Promise<Order[]> {
      const orders = await this.ordersService.readOne(id)
      return orders
  }

  @Put(':id')
  async putOrderOne(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOne(id, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrderAll(@Param('id') id: string) {
    return this.ordersService.deleteAll(id);
  }
}
