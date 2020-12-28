import redis from 'redis';

const publisher = redis.createClient()

const players = [
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

const Publish = () => {
    setInterval(() => {
        const random = parseInt((Math.random() * 100).toFixed(0)) % 5
        const target = players[random] || players[0];
        target.point = parseFloat((Math.random() * 10000 / 100).toFixed(2))
        publisher.publish('ticker@update', JSON.stringify(target))
    }, 1000);
    
    setInterval(() => {
        const random = parseInt((Math.random() * 100).toFixed(0)) % 5
        const target = players[random] || players[0];
        target.point = parseFloat((Math.random() * 10000 / 100).toFixed(2))
        publisher.publish('ticker@update', JSON.stringify(target))
    }, 2000);
}

export default Publish