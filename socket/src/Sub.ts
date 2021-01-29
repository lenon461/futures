import _ from 'lodash';
import redis from 'redis';
const subscriber = redis.createClient()

const ticks: any = {}

const Subscribe = (io) => {

    subscriber.on("message", function(channel, message) {
        const {event, name} = {event : channel.split('@')[0], name: channel.split('@')[1]}
        if(event === '#trade') {
            const tick = JSON.parse(message);
            _.set(ticks, tick.marketId, tick)
        }
        if(event === '#depth') {
            const name = JSON.parse(message).name
            io.to(name).emit('depth', (message))
        }
    });
}
const getTicks = () => {
    console.log(ticks)
    return Object.values(ticks)
}
subscriber.subscribe('#trade')
subscriber.subscribe('#depth')

export default Subscribe
export { getTicks };

