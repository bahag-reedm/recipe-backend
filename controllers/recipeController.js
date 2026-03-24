import { pool } from "../pool.js";

export const getRecipes = async (req, res) => {
  try {
    const recipes = await pool.query("SELECT * FROM recipes");
    console.log(recipes.rows);
    return res.json(recipes.rows);
  } catch (err) {
    return res.json(err.message);
  }
};

export const getRecipeById = async (req, res) => {
  let { id } = req.params;
  try {
    const recipes = await pool.query(`SELECT * FROM recipes WHERE id=$1`, [id]);
    return res.json(recipes.rows);
  } catch (err) {
    return res.json(err.message);
  }
};

export const createRecipe = async (req, res) => {
  const { name, category, area, image } = req.body;
  console.log("here");
  try {
    const result = await pool.query(
      `INSERT INTO recipes (name, category, area, image) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, category, area, image],
    );
    console.log(result);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.json(err.message);
  }
};

// export const updateRecipe = (req, res) => {
//   let { id } = req.params;
//   const index = recipes.meals.findIndex((e) => e.idMeal === parseInt(id));
//
//   if (index === -1) {
//     return res.status(404).send({ message: "Recipe not found" });
//   }
//
//   recipes.meals[index] = {
//     ...recipes.meals[index],
//     ...req.body,
//     id: parseInt(id),
//   };
//   res.send(recipes.meals[index]);
// };
//
// export const deleteRecipe = (req, res) => {
//   let { id } = req.params;
//   const index = recipes.meals.findIndex((e) => e.idMeal === parseInt(id));
//
//   if (index === -1) {
//     return res.status(404).send({ message: "Recipe not found" });
//   }
//
//   const deletedRecipe = recipes.meals.splice(index, 1);
//   res.send(deletedRecipe[0]);
// };
