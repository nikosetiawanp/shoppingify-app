import express from "express";
import {
  deleteShoppingList,
  getAllShoppingLists,
  createShoppingList,
  patchShoppingList,
  getShoppingList,
} from "../controllers/shoppingListController.ts";
import { verifyToken } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.use(verifyToken);

router.route("/").get(getAllShoppingLists).post(createShoppingList);
router
  .route("/:id")
  .get(getShoppingList)
  .delete(deleteShoppingList)
  .patch(patchShoppingList);

export default router;
