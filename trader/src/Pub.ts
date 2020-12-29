import redis from 'redis';

export const publisher = redis.createClient()

const players = [
    {
        name:'PAKA',
        point:30,
    },
    {
        name:'가나라마아바',
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
        const target =  players[0];
        target.point = parseFloat((Math.random() * 10000 / 100).toFixed(2))
        publisher.publish(`ticker@${target.name}`, JSON.stringify(target))
    }, 1000);
    
    setInterval(() => {
        const target =  players[0];
        target.point = parseFloat((Math.random() * 10000 / 100).toFixed(2))
        publisher.publish(`ticker@${target.name}`, JSON.stringify(target))
    }, 2000);
    

}

export default Publish
