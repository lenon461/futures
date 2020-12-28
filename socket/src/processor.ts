import Queue from "bull";
import io from './app';

const queue = new Queue('ticker', 'redis://127.0.0.1:6379');

const job = () => {

    // setInterval(() => {
    //     queue.add([{
    //         name: 'hob',
    //         point: '30'
    //     }])
    //     console.log("ADD!")
    // }, 1000)

    queue.process('ticker', (job, done) => {
        console.log(job.data)
        io.emit('ticker')
        done();
    });
}

export default job