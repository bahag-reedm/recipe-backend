import express from "express";
import "dotenv/config";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { logger, errorHandler } from "./middleware/middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(logger);

app.use(
  express.urlencoded({
    extended: false,
  }),
);

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Static Route for uploads (images)
app.use("/images", express.static("images"));
// API Routes
app.use("/recipes", recipeRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});

// export default app;
