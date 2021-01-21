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

import { Document } from 'mongoose';
export interface DOrder extends Document {
    readonly id: String;
    readonly memberId: String;
    readonly marketId: String;
    readonly price: Number;
    readonly qty: Number;
    readonly type: String;
    readonly status: String;
    readonly time: Number;
}