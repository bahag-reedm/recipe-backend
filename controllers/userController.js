import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { users } from "../db/schema.js";

export const getUsers = async (req, res) => {
  try {
    const result = await db.select().from(users);
    return res.json(result);
  } catch (err) {
    return res.json(err.message);
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query.users.findFirst({
      where: eq(users.id, parseInt(id)),
      with: { recipes: true },
    });
    return res.json(result);
  } catch (err) {
    return res.json(err.message);
  }
};

export const createUser = async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;
  try {
    const result = await db
      .insert(users)
      .values({ username, password, email, firstName, lastName })
      .returning();
    return res.status(201).json(result[0]);
  } catch (err) {
    return res.json(err.message);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, email, firstName, lastName } = req.body;
  try {
    const result = await db
      .update(users)
      .set({ username, password, email, firstName, lastName })
      .where(eq(users.id, parseInt(id)))
      .returning();
    return res.json(result[0]);
  } catch (err) {
    return res.json(err.message);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(users).where(eq(users.id, parseInt(id)));
    return res.status(204).send();
  } catch (err) {
    return res.json(err.message);
  }
};
