import { Router } from "express";
 import { createTask, selectTasks, updateTaskStatus, deleteTask } from "../controllers/tasks.controllers";
import { authValidation } from "../middlewares/authorization.middlewares";
import { validateSchema } from "../middlewares/schemaValidator";
import taskSchema from "../models/taskSchema";

const router = Router();

router.use(authValidation)
router.post("/createtask", validateSchema(taskSchema), createTask)

router.get("/gettasks", selectTasks)

router.put("/:id", updateTaskStatus)

router.delete("/:id", deleteTask)

export default router;