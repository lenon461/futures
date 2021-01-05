import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DOrder } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL') private readonly orderModel: Model<DOrder>,
    ) { 
  }
  private readonly logger = new Logger(OrdersService.name);

  async create(createOrderDto: CreateOrderDto): Promise<DOrder> {
    const createdOrder = new this.orderModel(createOrderDto);
    const order = await createdOrder.save();
    return order
  }
  async find(_id: string) {
    const order =  await this.orderModel.findOne({_id}).exec();
    return order
  }
  
  async findAll() {
    const order =  await this.orderModel.find().exec();
    return order
  }

  async update(_id: number, updateOrderDto: UpdateOrderDto) {
    const result =  await this.orderModel.updateOne({_id}, updateOrderDto).exec();
    this.logger.debug("update")
  }

  deleteAll() {
    this.orderModel.deleteMany({status: "GO"});
    this.orderModel.deleteMany({status: "CM"});
  }
}
