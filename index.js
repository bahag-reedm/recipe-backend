import express from "express";
import "dotenv/config";
import recipes from "./recipies.json" with { type: "json" };

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.get("/recipes", (request, response) => {
  response.send(recipes.recipes);
});

app.get("/recipes/:id", (request, response) => {
  let { id } = request.params;
  const recipe = recipes.recipes.find((e) => e.id === parseInt(id));
  response.send(recipe);
});

app.post("/recipes", (request, response) => {
  let lastID = recipes.recipes.length;
  console.log(lastID);

  let recipe = request.body;
  recipe.id = lastID + 1;

  recipes.recipes.push(recipe);
  response.send(recipes);
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});

// export default app;
