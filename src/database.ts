import mongoose, { ConnectOptions } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + '/.env' });

const { DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME } = process.env;

const url = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@notesdb.dzmbr0p.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
const connectDB = async(): Promise<void> => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(url,{
        useUnifiedTopology: true,
        useNewUrlParser: true
     } as ConnectOptions)
     .then(db => console.log('data base connected'))
     .catch(err => console.log(err));
}; 

export default connectDB;