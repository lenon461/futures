import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    id: String,
    memberId: String,
    marketId: String,
    price: Number,
    qty: Number,
    type: String,
    status: String,
    time: Number,
});