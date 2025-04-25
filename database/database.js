import { config } from 'dotenv'; config();
import mongoose from 'mongoose';
import { object } from 'webidl-conversions';

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once('open', ()=>{
    console.log (`MongoDB connected: ${mongoose.connection.name}`);
});