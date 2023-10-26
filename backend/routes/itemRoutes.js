import express from "express";

import {
  getAllItems,
  createItem,
  deleteItem,
  patchItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.route("/").get(getAllItems).post(createItem);
router.route("/:id").delete(deleteItem).patch(patchItem);

export default router;
