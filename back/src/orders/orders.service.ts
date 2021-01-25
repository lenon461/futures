import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL') private readonly orderModel: Model<Order>,
    ) { 
  }
  private readonly logger = new Logger(OrdersService.name);

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const defaultOrderProperty = {
      total_qty: createOrderDto.qty,
      time: new Date().getTime(),
      status: "GO"
    }
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

  async cancelOne(_id: string) {
    const result =  await this.orderModel.updateOne({_id}, {status: 'CC'}).exec();
    return result;
  }

  async deleteAll(memberId) {
    const result = await this.orderModel.deleteMany({memberId})
    return result
  }

  async deleteOne(id) {
    const result = await this.orderModel.deleteMany({id})
    return result
  }
}
