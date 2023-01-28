import { Router } from "express";
 import { createTask, selectTasks, updateTaskStatus, deleteTask } from "../controllers/tasks.controllers.js";
import { authValidation } from "../middlewares/authorization.middlewares.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import taskSchema from "../models/taskSchema.js";

const router = Router();

router.use(authValidation)
router.post("/createtask", validateSchema(taskSchema), createTask)

router.get("/gettasks", selectTasks)

router.put("/:id", updateTaskStatus)

router.delete("/:id", deleteTask)

export default router;