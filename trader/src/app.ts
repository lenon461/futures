import cors from "cors";
import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import routerrr from "./routes/index";
import Trader from './trader';
import MODEL from './database'

const Queue = require('bull')
const QueueMQ = require('bullmq')
const { setQueues, BullMQAdapter, BullAdapter } = require('bull-board')

const someQueue = new Queue(`order`, {redis: {port: 6379, host: '127.0.0.1'}})

setQueues([
  new BullAdapter(someQueue),
]);

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
const {router} = require('bull-board')

app.use("/", routerrr);
app.use('/admin/queues', router)

app.use((req, res, next) => {
    next(createError(404));
});

app.use(
    (
        err: createError.HttpError,
        req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
    ) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};
        // render the error page

        res.status(err.status || 500);
        res.send(err.message);
    },
);


(async () => {
    
    const uri = "mongodb+srv://seonjl:seonjl@cluster0.gbwnb.mongodb.net/futures"
    const summoners = await MODEL.SUMMONER_MODEL.find({}).exec()
    
    // Subscribe()
    // Publish()
    const trader = new Trader(summoners[1].name)
    // const Traders = summoners.map(summoner => new Trader(summoner.name))
    
    app.listen(5005, () => {
        console.info('5005 Trader Start')
    })
})()
export default app;