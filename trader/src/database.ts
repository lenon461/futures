import mongoose from 'mongoose';

const uri = "mongodb+srv://seonjl:seonjl@cluster0.gbwnb.mongodb.net/futures"
mongoose.createConnection(uri, { poolSize: 4 });