import express, { Express, Request, Response } from 'express';
import { router } from './router';
import morgan from 'morgan';
import cors from 'cors';
import { createUser, signin } from './handler/user';
import { protect } from './modules/auth';
const app: Express = express();

const corsOptions ={
    origin:'*',
    credentials:true,            // access-control-allow-credentials:true
}
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/signup", createUser);
app.post("/signin", signin);
app.use("/api",protect ,router);

app.get("/", (req: Request, res: Response) => {
    res.status(200);
    res.json({ message: "Hello" });
});

export default app;
