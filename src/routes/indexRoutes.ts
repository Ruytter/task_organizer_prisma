import {Router} from "express";
import authRouter from "./auth.routes";
import tasksRouter from "./tasks.routes"

const router = Router();

router.use(authRouter);
router.use(tasksRouter);


export default router;
