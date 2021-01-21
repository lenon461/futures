import mongoose from 'mongoose';

import { Summoner, SummonerSchema } from './schemas/summoner';
import { DOrder, OrderSchema } from './schemas/order';

const uri = "mongodb+srv://seonjl:seonjl@cluster0.gbwnb.mongodb.net/futures"
mongoose.createConnection(uri, { poolSize: 4 });

const conn = mongoose.createConnection(uri, { poolSize: 4, useNewUrlParser: true, useUnifiedTopology: true });
const SUMMONER_MODEL = conn.model<Summoner>('summoners', SummonerSchema);
const ORDER_MODEL = conn.model<DOrder>('orders', OrderSchema)

const MODEL = {SUMMONER_MODEL, ORDER_MODEL}

export default MODEL 