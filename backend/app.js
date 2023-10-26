import express from "express";
import itemRouter from "./routes/itemRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import shoppingListRouter from "./routes/shoppingListRoutes.js";
import shoppingItemRouter from "./routes/shoppingItemRoutes.js";

const app = express();

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use("/api/v1/items/", itemRouter);
app.use("/api/v1/categories/", categoryRouter);
app.use("/api/v1/shoppinglists/", shoppingListRouter);
app.use("/api/v1/shoppingitems/", shoppingItemRouter);

export default app;
