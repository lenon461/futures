import _ from 'lodash';
import redis from 'redis';
const subscriber = redis.createClient()

const ticks: any = {}

const Subscribe = (io) => {

    subscriber.on("message", function(channel, message) {
        const {event, name} = {event : channel.split('@')[0], name: channel.split('@')[1]}
        if(event === '#ticker') {
            const tick = JSON.parse(message);
            _.set(ticks, tick.name, tick)
        }
        if(event === '#depth') {
            const name = JSON.parse(message).name
            io.to(name).emit('depth', JSON.stringify(message))
        }
    });
}
const getTicks = () => {
    return ticks
}
subscriber.subscribe('#ticker')
subscriber.subscribe('#depth')

export default Subscribe
export { getTicks };

