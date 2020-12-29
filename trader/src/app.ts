import cors from "cors";
import express from "express";
import createError from "http-errors";
import mongoose from 'mongoose';
import morgan from "morgan";
import router from "./routes/index";
import { Summoner, SummonerSchema } from './schemas/summoner';
import Trader from './trader';
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/", router);

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
    const conn = await mongoose.createConnection(uri, { poolSize: 4, useNewUrlParser: true, useUnifiedTopology: true });
    const SUMMONER_MODEL = conn.model<Summoner>('summoners', SummonerSchema);
    const summoners = await SUMMONER_MODEL.find({}).exec()
    
    // Subscribe()
    // Publish()

    const Traders = summoners.map(summoner => new Trader(summoner.name))
    
    app.listen(5005, () => {
        console.info('5005 Trader Start')
    })
})()
export default app;