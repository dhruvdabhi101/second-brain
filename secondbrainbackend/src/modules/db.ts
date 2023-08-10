import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';
import dotenv = require('dotenv');
dotenv.config();

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL as string);
}
