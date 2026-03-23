import express from "express";
import "dotenv/config";
import cors from "cors";
import recipes from "./data/recipes.json" with { type: "json" };
import { Pool } from "pg";

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: process.env.PORT,
});

app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.get("/recipes", (request, response) => {
  response.send(recipes.meals);
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await pool.query("SELECT * FROM orders");
    console.log(orders);
    return res.json(orders.rows);
  } catch (err) {
    return res.json(err.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    console.log(users);
    return res.json(users.rows);
  } catch (err) {
    return res.json(err.message);
  }
});

app.get("/recipes/:id", (request, response) => {
  let { id } = request.params;
  const recipe = recipes.meals.find((e) => e.idMeal === parseInt(id));
  response.send(recipe);
});

app.post("/recipes", (request, response) => {
  let lastID = recipes.meals.length;

  let recipe = request.body;
  recipe.id = lastID + 1;

  recipes.meals.push(recipe);
  response.send(recipes);
});

app.put("/recipes/:id", (request, response) => {
  let { id } = request.params;
  const index = recipes.meals.findIndex((e) => e.idMeal === parseInt(id));

  if (index === -1) {
    return response.status(404).send({ message: "Recipe not found" });
  }

  recipes.meals[index] = {
    ...recipes.meals[index],
    ...request.body,
    id: parseInt(id),
  };
  response.send(recipes.recipes[index]);
});

app.delete("/recipes/:id", (request, response) => {
  let { id } = request.params;
  const index = recipes.meals.findIndex((e) => e.idMeal === parseInt(id));

  if (index === -1) {
    return response.status(404).send({ message: "Recipe not found" });
  }

  const deletedRecipe = recipes.meals.splice(index, 1);
  response.send(deletedRecipe[0]);
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});

// export default app;
