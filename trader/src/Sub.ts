import redis from 'redis';

const subscriber = redis.createClient()

const Subscribe = () => {
    subscriber.on("message", function(channel, message) {
        console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
    });
}

subscriber.subscribe('ticker@update')   
export default Subscribe