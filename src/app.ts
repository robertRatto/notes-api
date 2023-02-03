import express from 'express';
import connectDB from './database'
import * as dotenv from "dotenv";
import cors from "cors";
import  routes  from './routes'

dotenv.config({ path: __dirname + '/.env' });

class Application {
    app: express.Application;
    port: String;
    routes;
    cors;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.routes = routes;
        this.cors = cors();
    }

    start(): void {

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(this.cors);

        this.app.use( this.routes );

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);

            //DB connection.
            connectDB();
        })
    }
}

export default Application;