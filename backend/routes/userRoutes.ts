import express from "express";

import { verifyToken } from "../middlewares/authMiddleware.ts";
import { getUser } from "../controllers/userController.ts";

const router = express.Router();

router.use(verifyToken);

router.route("/me").get(getUser);

export default router;
