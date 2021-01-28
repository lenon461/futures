import { Document } from 'mongoose';

export interface User extends Document {
    readonly id: String;
    readonly name: String;
    readonly passwd: String;
}