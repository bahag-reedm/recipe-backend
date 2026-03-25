import express from "express";
import "dotenv/config";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/recipes", recipeRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);


app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});

// export default app;
