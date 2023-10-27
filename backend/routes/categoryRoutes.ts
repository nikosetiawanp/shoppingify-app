import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categoryController.ts";

const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory);
router.route("/:id").delete(deleteCategory);

export default router;