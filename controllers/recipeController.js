import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { recipes } from "../db/schema.js";

export const getRecipes = async (req, res) => {
  try {
    const result = await db.select().from(recipes);
    return res.json(result);
  } catch (err) {
    return res.json(err.message);
  }
};

export const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.select().from(recipes).where(eq(recipes.id, parseInt(id)));
    return res.json(result);
  } catch (err) {
    return res.json(err.message);
  }
};

export const createRecipe = async (req, res) => {
  const { name, category, area, image, userId } = req.body;
  try {
    const result = await db.insert(recipes).values({ name, category, area, image, userId }).returning();
    return res.status(201).json(result[0]);
  } catch (err) {
    return res.json(err.message);
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, category, area, image } = req.body;
  try {
    const result = await db
      .update(recipes)
      .set({ name, category, area, image })
      .where(eq(recipes.id, parseInt(id)))
      .returning();
    return res.json(result[0]);
  } catch (err) {
    return res.json(err.message);
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(recipes).where(eq(recipes.id, parseInt(id)));
    return res.status(204).send();
  } catch (err) {
    return res.json(err.message);
  }
};
