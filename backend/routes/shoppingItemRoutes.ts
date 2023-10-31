import express from "express";
import {
  createShoppingItem,
  deleteShoppingItem,
  patchShoppingItem,
} from "../controllers/shoppingItemController.ts";
import { verifyToken } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.use(verifyToken);

router.route("/").post(createShoppingItem);
router.route("/:id").delete(deleteShoppingItem).patch(patchShoppingItem);

export default router;
