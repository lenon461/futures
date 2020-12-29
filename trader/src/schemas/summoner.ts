import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const SummonerSchema = new mongoose.Schema({
    id: String,
    accountId: String,
    puuid: String,
    name: String,
    profileIconId: Number,
    revisionDate: Number,
    summonerLevel: Number,
});


export interface Summoner extends Document {
    readonly id: String;
    readonly accountId: String;
    readonly puuid: String;
    readonly name: String;
    readonly profileIconId: Number;
    readonly revisionDate: Number;
    readonly summonerLevel: Number;
}