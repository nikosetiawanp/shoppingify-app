import express from "express";
import {
  createShoppingItem,
  deleteShoppingItem,
  patchShoppingItem,
} from "../controllers/shoppingItemController.js";

const router = express.Router();

router.route("/").post(createShoppingItem);
router.route("/:id").delete(deleteShoppingItem).patch(patchShoppingItem);

export default router;
