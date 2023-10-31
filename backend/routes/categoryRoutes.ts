import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categoryController.ts";
import { verifyToken } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.use(verifyToken);

router.route("/").get(getAllCategories).post(createCategory);
router.route("/:id").delete(deleteCategory);

export default router;
