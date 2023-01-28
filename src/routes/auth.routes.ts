import { Router } from "express";
import { signin, logout } from "../controllers/auth.controllers.js";
import { createUser } from "../controllers/users.controllers.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { authValidation } from "../middlewares/authorization.middlewares.js";
import loginSchema from "../models/loginSchema.js";
import userSchema from "../models/userSchema.js";

const router = Router();

router.post("/signup", validateSchema(userSchema), createUser);
router.post("/signin", validateSchema(loginSchema), signin);
router.post("/logout", authValidation, logout);

export default router;
