import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL') private readonly orderModel: Model<Order>,
    ) { 
  }
  private readonly logger = new Logger(OrdersService.name);

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    const order = await createdOrder.save();
    return order
  }
  async readOne(id: string) {
    const order =  await this.orderModel.find({id}).exec();
    return order
  }
  
  async readAll() {
    const order =  await this.orderModel.find().exec();
    return order
  }

  async updateOne(id: string, updateOrderDto: UpdateOrderDto) {
    const result =  await this.orderModel.updateOne({id}, updateOrderDto).exec();
  }

  async deleteAll(id) {
    const result = await this.orderModel.deleteMany({id})
    return result
  }
}
