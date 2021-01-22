import { publisher } from './Pub';
import _ from 'lodash'
import MODEL from './database'
import Queue from 'bull'
import { ProxyAuthenticationRequired } from 'http-errors';
import { DOrder } from 'schemas/order';
import e from 'cors';


class Trader {
    
    private readonly logger = console
    private readonly queue =  new Queue(`order`, {redis: {port: 6379, host: '127.0.0.1'}}); // Specify Redis connection using object
    private name: string;
    
    private bidBook = [];
    private askBook = [];

    constructor(name) {
        this.name = name

        this.publish()
        this.initializeOrderBook()
    }
    
    publish() {
        // setInterval(() => {
        //     // 체결시 마다 실행될 훅
        //     publisher.publish(`#ticker`, JSON.stringify({
        //         name: `${this.name}`,
        //         point: parseFloat((Math.random() * 10000 / 100).toFixed(2)),
        //     }))
        // }, 1000);

        setInterval(() => {
            // 1s 마다 전체 호가 Pub
            // TODO 업데이트된 값만 Pub 하도록 수정
            const ob = this.getBook()
            publisher.publish(`#depth`, JSON.stringify(ob))
            console.log(ob)
        }, 1000);
    }

    async initializeOrderBook() {
        (await MODEL.ORDER_MODEL.find()
            .where('status')
            .equals('GO')
            .sort('-price'))
            .forEach(dorder => this.addOrder(dorder));
    }

    public addDirectOrder(dorder: DOrder) {
        const order = {
            id: dorder._id,
            qty: Number(dorder.qty),
            price: Number(dorder.price)
        }
        
        if(dorder.type === 'S') this.addBook(this.bidBook, order)
        else if (dorder.type === 'B') this.addBook(this.askBook, order)
    }

    public addTradeOrder(dorder: DOrder) {
        const order = {
            id: dorder._id,
            qty: Number(dorder.qty),
            price: Number(dorder.price)
        }
        
        if(dorder.type === 'S') this.tradeBook(this.bidBook, order)
    }

    public addBook(book, order) {
        const line = book.find(line => line.price === order.price)
        
        if(line === undefined){
            book.push(new Line(order))
            return;
        }
        else if(line){
            line.volume += order.qty;
            line.orders.push(order)
        }        
        else throw new Error("Unknown Order Bid")

        this.sort(book)
    }
    
    public getBook() {
        return {
            bid: this.bidBook,
            ask: this.askBook
        }
    }

    tradeBook(book, order) {

        book.
        
    }

    sort(book) {
        book.sort((a, b) => b.price - a.price)
    }
}

class Line {
    
    volume = 0;
    price = 0;
    orders:any = [];
    constructor(order){
        this.price = order.price
        this.volume = order.qty
        this.orders.push(order)
    }

    get() {
        return {
            volume: this.volume,
            price: this.price
        }
    }
}

export default Trader
