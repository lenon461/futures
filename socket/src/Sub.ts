import redis from 'redis';
const subscriber = redis.createClient()

const tickers:Array<any> = [];

const Subscribe = (io) => {

    io.emit('ticker', JSON.stringify(tickers))
    setInterval(() => {
        io.emit('ticker', JSON.stringify(tickers))
    }, 1000);

    subscriber.on("message", function(channel, message) {
        const {event, name} = {event : channel.split('@')[0], name: channel.split('@')[1]}
        if(event === 'ticker') {
            const newTick = JSON.parse(message);
            const oldTick = tickers.find(ele => ele.name === newTick.name);
            if(oldTick) {
                oldTick.point = newTick.point
            } else {
                tickers.push(newTick)
            }
        }
        if(event === 'depth') {
            // io.emit("depth", message)  
            const name = JSON.parse(message).name
            console.log(name, message)
            io.to(name).emit(message)
        }
    });
}

subscriber.subscribe('ticker@tick')   
subscriber.subscribe('depth@dep')   
export default Subscribe
export { tickers };

