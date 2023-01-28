import {Router} from "express";
import authRouter from "./auth.routes.js";
import tasksRouter from "./tasks.routes.js"

const router = Router();

router.use(authRouter);
router.use(tasksRouter);


export default router;
