import { publisher } from './Pub';
import _ from 'lodash'
import MODEL from './database'
import Queue from 'bull'
import { ProxyAuthenticationRequired } from 'http-errors';
interface Order extends Document {
    readonly id: String;
    readonly memberId: String;
    readonly marketId: String;
    readonly price: Number;
    readonly qty: Number;
    readonly type: String;
    readonly status: String;
    readonly time: Number;
}
class Trader {

    private readonly logger = console
    
    // 마켓정보
    MKNAME = "TEST"
    private readonly Queue =  new Queue(`order`, {redis: {port: 6379, host: '127.0.0.1'}}); // Specify Redis connection using object


    //오더북
    private OrderBook = {}

    //오더북
    private SellOrderBook: any = []
    private BuyOrderBook: any = [];

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
            publisher.publish(`#depth`, JSON.stringify(this.getOrderBooks()))
            console.log(this.getOrderBooks())
        }, 1000);
    }

    process() {
        this.Queue.process(this.MKNAME, (job, done) => {
            console.log(this.MKNAME + " process", job.data.price, job.data.qty)
            this.addOrder(job.data)

            done();
        })
    }

    async initializeOrderBook() {
        // orderbook 이 먼저 init 되는걸 보장해주어야함. need to be fix
        (await MODEL.ORDER_MODEL.find()
            .where('status').equals('GO')
            .sort('time')).forEach(val => this.addOrder(val));
    }

    // getter
    getBuyOrderBook() {
        return this.BuyOrderBook
    }
    getSellOrderBook() {
        return this.SellOrderBook
    }
    getOrderBooks() {
        return {
            name: this.MKNAME,
            S: this.getSellOrderBook().map(orders => orders.map(order => {
                return { price: order.price, qty: order.qty }
            })),
            B: this.getBuyOrderBook().map(orders => orders.map(order => {
                return { price: order.price, qty: order.qty }
            })),
        }
    }

    // visual
    showOrderBooks() {
        const showOrderBook = (ob: IOrder[][]) => {
            return ob.map(orders => {
                if (orders.length !== 0) {
                    const t_qty = orders.map(order => Number(order.qty)).reduce((p, c) => p + c, 0)
                    const price = orders[0].price;
                    return { t_qty, price }
                }
            })
        }
        this.logger.debug("==========================================")
        this.logger.debug({
            S: showOrderBook(this.getSellOrderBook()),
            B: showOrderBook(this.getBuyOrderBook())
        })
        return {
            S: showOrderBook(this.getSellOrderBook()),
            B: showOrderBook(this.getBuyOrderBook())
        }
    }

    // public logic
    public addOrder(order: any) {

        // const makerOrderBook = order.type === "S" ? this.getBuyOrderBook() : this.getSellOrderBook();
        // const takerOrderBook = order.type === "S" ? this.getSellOrderBook() : this.getBuyOrderBook();


        this.doTrade(order)

    }

    // private logic
    private _addOrder(order: any) {
        const mergeOrderBook = order.type === "S" ? this.getSellOrderBook() : this.getBuyOrderBook();
        const thisOrder = order;
        const flattened = targetOrderBook => [].concat(...targetOrderBook)
        if (flattened(mergeOrderBook).length === 0) {
            mergeOrderBook.push([order])
            return;
        }
        for (let center = mergeOrderBook.length - 1; center >= 0; center--) {
            const mergeOrders = mergeOrderBook[center]
            if (mergeOrders.length === 0) {
                mergeOrderBook.splice(center, 1)
                continue;
            };
            const mergeOrder = mergeOrders[0];


            if (mergeOrder.price === thisOrder.price) {

                mergeOrders.unshift(thisOrder)
                return;
            }
            else if (thisOrder.type === "S") {
                if (mergeOrder.price > thisOrder.price) {
                    mergeOrderBook.splice(center + 1, 0, [thisOrder])
                    return;
                }
                else if (mergeOrder.price < thisOrder.price) {
                    if (center === 0) mergeOrderBook.unshift([thisOrder])
                    continue;
                }
            }
            else if (thisOrder.type === "B") {
                if (mergeOrder.price < thisOrder.price) {
                    mergeOrderBook.splice(center + 1, 0, [thisOrder])
                    return;
                }
                else if (mergeOrder.price > thisOrder.price) {
                    if (center === 0) mergeOrderBook.unshift([thisOrder])
                    continue;
                }
            }
            else {
                throw new Error("Wrong order Type")
            }
        }

    }
    private doTrade(order: any) {
        const makerOrderBook = order.type === "S" ? this.getBuyOrderBook() : this.getSellOrderBook();
        const flattened = targetOrderBook => [].concat(...targetOrderBook)
        if (flattened(makerOrderBook).length === 0) {
            this.logger.debug("오더북 비어있음 => 추가")
            this._addOrder(order)
            return;
        }
        const takerOrder = order;
        for (let center = makerOrderBook.length - 1; center >= 0; center--) {
            const makerOrders = makerOrderBook[center]

            if (makerOrders.length === 0) {
                makerOrderBook.splice(center, 1)
                continue;
            };
            for (let index = makerOrders.length - 1; index >= 0; index--) {

                const makerOrder = makerOrders[index];

                let buyer = order.type === "S" ? makerOrder : order
                let seller = order.type === "S" ? order : makerOrder
                if (buyer.price >= seller.price) {
                    this.logger.debug("가격 충족 => 체결")
                    if (buyer.qty < seller.qty) {
                        this.logger.debug("buyer 수량 전체 충족 seller 수량 일부 충족")

                        makerOrder.type === "B" ? makerOrders.splice(index, 1) : null
                        buyer.status = "CM"
                        this.filledOrder(buyer)

                        seller.qty -= buyer.qty;
                        this.filledOrder(seller)

                        // this.doTrade(seller)

                        return;

                    }
                    else if (buyer.qty === seller.qty) {
                        this.logger.debug("buyer 수량 전체 충족 seller 수량 전체 충족")

                        makerOrders.splice(index, 1)

                        buyer.status = "CM"
                        seller.status = "CM"

                        this.filledOrder(buyer)
                        this.filledOrder(seller)

                        return;
                    }
                    else if (buyer.qty > seller.qty) {
                        this.logger.debug("buyer 수량 일부 충족 seller 수량 전체 충족")

                        makerOrder.type === "S" ? makerOrders.splice(index, 1) : null
                        seller.status = "CM"
                        this.filledOrder(seller)

                        buyer.qty -= seller.qty
                        this.filledOrder(buyer)

                        // this._addOrder(buyer)

                        return;
                    }
                    else {
                        throw new Error("가격 조건 오류")
                    }
                }
                else if (buyer.price < seller.price) {
                    this.logger.debug("가격 미충족 => 미체결")
                    this._addOrder(order)
                    return;
                }

            }
        }

    }

    async filledOrder(order) {
        // this.ordersQueue.add('orderComplete', order)
        // this.Queue.add('orderComplete', order, {attempts: 5, backoff: 1000})
        await MODEL.ORDER_MODEL.findByIdAndUpdate(order._id, {status: order.status, qty: order.qty}, {useFindAndModify: false})
    }

    private cancelOrder() {

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

interface IAsk {
    volume: number;
    price: number;
    orders: IOrder[]
}
export interface IOrder {
    readonly id: String;
    readonly price: Number;
    qty: number;
}
export default Trader
