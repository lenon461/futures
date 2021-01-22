import { publisher } from './Pub';
import _ from 'lodash'
import MODEL from './database'
import Queue from 'bull'
import { ProxyAuthenticationRequired } from 'http-errors';
import { DOrder } from 'schemas/order';


class Trader {
    
    private readonly logger = console
    private readonly queue =  new Queue(`order`, {redis: {port: 6379, host: '127.0.0.1'}}); // Specify Redis connection using object
    private name: string;
    
    private bidBook: Book<Bid> = new Book()
    private askBook: Book<Ask> = new Book()

    constructor(name) {
        this.name = name
    }
    
    public addOrder(dorder: DOrder) {
        const order = new Order(dorder);

        if(dorder.type === 'S') this.bidBook.add(order)

    }
    // private addBook<T>(book: Array<T>, order: IOrder){
    //     const line = book.find(line => line.price === order.price);
    //     if(line === undefined) book.push()
    // }
    // private trade(book: Array<Ask | Bid>, order) {
    //     const line = book.find(line => line.price === order.price);
    // }
    

}
class Book<T> {
    lines: T[] = [];
    add(order: Order) {
        const line = this.lines.find(line => line.price === order.price);
    }
}

class Line<T> {
    volume = 0;
    price = 0;
    orders: T[] = []; 

}

class Order {
    id: String;
    qty: number;
    price: number;
    constructor(dorder: DOrder) {
        this.id = dorder._id
        this.qty = Number(dorder.qty)
        this.price = Number(dorder.price)
    }
}
class Ask extends Order {
}
class Bid extends Order {
}

interface IOrder {
    readonly id: String;
    qty: number;
    readonly price: number;
}