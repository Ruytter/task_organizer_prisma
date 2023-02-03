import express from "express";
import router from './routes/indexRoutes';
import { Request, Response } from "express";


const app = express();
app.use(express.json());
app.use(router);

app.post("/health", (req: Request, res: Response) => {res.send("OK")})

export default app