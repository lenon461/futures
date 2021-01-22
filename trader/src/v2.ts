import { publisher } from './Pub';
import _ from 'lodash'
import MODEL from './database'
import Queue from 'bull'
import { ProxyAuthenticationRequired } from 'http-errors';
import { DOrder } from 'schemas/order';
class Trader {

    private readonly logger = console
    
    // 마켓정보
    MKNAME = "TEST"
    private readonly Queue =  new Queue(`order`, {redis: {port: 6379, host: '127.0.0.1'}}); // Specify Redis connection using object


    //오더북
    orderBook = new OrderBook()

    constructor(MKNAME) {
        this.logger.debug(MKNAME + " Trade init")
        this.MKNAME = MKNAME
        this.initializeOrderBook();
        this.publish()
        this.process()
    }

    publish() {
        setInterval(() => {
            // 체결시 마다 실행될 훅
            publisher.publish(`#ticker`, JSON.stringify({
                name: `${this.MKNAME}`,
                point: parseFloat((Math.random() * 10000 / 100).toFixed(2)),
            }))
        }, 1000);

        setInterval(() => {
            // 1s 마다 전체 호가 Pub
            // TODO 업데이트된 값만 Pub 하도록 수정
            const ob = this.orderBook.getOrderBook()
            publisher.publish(`#depth`, JSON.stringify(ob))
            console.log(ob)
        }, 1000);
    }

    process() {
        this.Queue.process(this.MKNAME, (job, done) => {
            console.log(this.MKNAME + " process", job.data.price, job.data.amount)
            this.addOrder(job.data)

            done();
        })
    }

    async initializeOrderBook() {
        (await MODEL.ORDER_MODEL.find()
            .where('status')
            .equals('GO')
            .sort('-price'))
            .forEach(dorder => this.addOrder(dorder));
    }

    addOrder(dorder: DOrder) {
        const order: IOrder = {
            id: dorder._id,
            qty: Number(dorder.qty),
            price: Number(dorder.price)
        }

        
        // if(dorder.type === 'S') this.orderBook.bidBook.tradeBid(order)

        if(dorder.type === 'S') this.orderBook.bidBook.addBid(order)
        else if (dorder.type === 'B') this.orderBook.askBook.addAsk(order)
        else throw new Error("Unknown Order Type")
    }

    trade(makers: Ask | Bid, taker: IOrder) {

        for (const maker of makers.orders) {

            if(maker.qty > taker.qty) {
                makers.volume -= taker.qty
                maker.qty -= taker.qty

                return true;
            }
            else if(maker.qty === taker.qty) {
                makers.volume -= taker.qty

                return true;
            }
            else {
                makers.volume -= taker.qty
                taker.qty -= maker.qty
                
            }
            
        }
    }

   
}


class OrderBook {
    bidBook: BidBook = new BidBook()
    askBook: AskBook = new AskBook()

    getOrderBook() {
        return {
            bid: this.bidBook.getBids(),
            ask: this.askBook.getAsks()
        }
    }
}
class BidBook {
    bids: Bid[] = []

    addBid(order: IOrder) {
        const bid = this.bids.find(bid => bid.price === order.price)
        if(bid === undefined){
            this.bids.push(new Bid(order))
            return;
        }
        else if(bid){
            bid.volume += order.qty;
            bid.orders.push(order)
        }        
        else throw new Error("Unknown Order Bid")

        this.sort()
    }

    sort() {
        this.bids.sort((a, b) => b.price - a.price)
    }
    
    getBids() {
        return this.bids.map(bid => bid.getBid())
    }


}
class Bid {
    volume = 0;
    price = 0;
    orders: IOrder[] = [];
    constructor(order: IOrder){
        this.price = order.price
        this.volume = order.qty
        this.orders.push(order)
    }

    getBid() {
        return {
            volume: this.volume,
            price: this.price
        }
    }
    
}
class AskBook {
    asks: Ask[] = []

    addAsk(order: IOrder) {
        const ask = this.asks.find(ask => ask.price === order.price)
        if(ask === undefined){
            this.asks.push(new Ask(order))
            return;
        }
        else if(ask){
            ask.volume += order.qty;
            ask.orders.push(order)
        }        
        else throw new Error("Unknown Order Ask")

        this.sort()
    }

    sort() {
        this.asks.sort((a, b) => b.price - a.price)
    }

    getAsks() {
        return this.asks.map(ask => ask.getAsk())
    }
}
class Ask  {
    volume = 0;
    price = 0;
    orders: IOrder[] = [];
    constructor(order: IOrder){
        this.price = order.price
        this.volume = order.qty
        this.orders.push(order)
    }

    getAsk() {
        return {
            volume: this.volume,
            price: this.price
        }
    }
}

export interface IOrder {
    readonly id: String;
    qty: number;
    readonly price: number;
}
export default Trader
