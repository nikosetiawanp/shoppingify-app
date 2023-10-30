import express from "express";
import itemRouter from "./routes/itemRoutes.ts";
import categoryRouter from "./routes/categoryRoutes.ts";
import shoppingListRouter from "./routes/shoppingListRoutes.ts";
import shoppingItemRouter from "./routes/shoppingItemRoutes.ts";
import authRouter from "./routes/authRoutes.ts";

const app = express();

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use("/api/v1/items/", itemRouter);
app.use("/api/v1/categories/", categoryRouter);
app.use("/api/v1/shoppinglists/", shoppingListRouter);
app.use("/api/v1/shoppingitems/", shoppingItemRouter);
app.use("/api/v1/auth/", authRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
