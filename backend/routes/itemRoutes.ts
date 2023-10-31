import express from "express";
import {
  getAllItems,
  createItem,
  deleteItem,
  patchItem,
} from "../controllers/itemController.ts";
import {
  checkItemOwnership,
  verifyToken,
} from "../middlewares/authMiddleware.ts";
import { check } from "express-validator";

const router = express.Router();

router.use(verifyToken);

router.route("/").get(getAllItems).post(createItem);
router.route("/:id").delete(deleteItem).patch(patchItem);

export default router;
