import express from "express";
import router from './routes/indexRoutes.js';
import { Request, Response } from "express";


const server = express();
server.use(express.json());
server.use(router);

server.post("/health", (req: Request, res: Response) => {res.send("OK")})

server.listen(4000, () => console.log("Serve is runing in port 4000"))