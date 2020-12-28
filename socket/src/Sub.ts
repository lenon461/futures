import redis from 'redis';

const subscriber = redis.createClient()

const tickers = [
    {
        name:'A',
        point:30,
    },
    {
        name:'B',
        point:30,
    },
    {
        name:'C',
        point:30,
    },
    {
        name:'D',
        point:30,
    },
    {
        name:'E',
        point:30,
    },
]

const Subscribe = () => {
    subscriber.on("message", function(channel, message) {
        const newTick = JSON.parse(message);
        tickers.find(ele => ele.name === newTick.name)!.point = newTick.point
    });
}

subscriber.subscribe('ticker@update')   
export default Subscribe
export { tickers };

