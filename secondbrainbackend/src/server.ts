import express, { Express, Request, Response } from 'express';
import { router } from './router';
import morgan from 'morgan';
import cors from 'cors';
const app: Express = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
    res.status(200);
    res.json({ message: "Hello" });
});

// TODO: Add Middleware for protecation and authentication

export default app;
