import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    memberId: String,
    marketId: String,
    price: Number,
    qty: Number,
    total_qty: Number,
    type: String,
    status: String,
    time: Number,
});