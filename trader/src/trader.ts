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
    private OrderBook: IOrderBook = {asks: [], bids: []};

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
            publisher.publish(`#depth`, JSON.stringify(this.OrderBook))
            console.log(this.OrderBook)
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
            .sort('time'))
            .forEach(dorder => this.addOrder(dorder));
    }

    addOrder(dorder: DOrder) {
        const order: IOrder = {
            id: dorder._id,
            qty: Number(dorder.qty),
            price: Number(dorder.price)
        }
        if(dorder.type === 'S') this.addBid(order)
        // else if (dorder.type === 'B') this.addBuyOrder(order)
        else throw new Error("Unknown Order Type")
    }

    addBid(order: IOrder) {

        const bid = this.OrderBook.bids.find(bid => bid.price === order.price)
        if(bid === undefined){
            this.OrderBook.bids.push(new Bid(order))
            return;
        }
        else if(bid){
            bid.volume += order.qty;
            bid.orders.push(order)
        }        
        // for (let index = 0; index < this.OrderBook.bids.length; index++) {
        //     const bid = this.OrderBook.bids[index];
        //     if(_.isUndefined(bid)) {
        //         this.OrderBook.bids[index] =  new Bid(order);
        //     }
        //     else if (bid.price === order.price) {
        //         bid.volume += order.qty;
        //         bid.orders.push(order)
        //     }
        // }
    }
   
}



interface IOrderBook {
    bids: IBid[]
    asks: IAsk[]
}

interface IBid {
    volume: number;
    price: number;
    orders: IOrder[]    
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
}

interface IAsk {
    volume: number;
    price: number;
    orders: IOrder[]
}
export interface IOrder {
    readonly id: String;
    qty: number;
    readonly price: number;
}
export default Trader
