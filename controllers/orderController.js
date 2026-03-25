import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { orders } from "../db/schema.js";

export const getOrders = async (req, res) => {
  try {
    const result = await db.select().from(orders);
    return res.json(result);
  } catch (err) {
    return res.json(err.message);
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.select().from(orders).where(eq(orders.id, parseInt(id)));
    return res.json(result);
  } catch (err) {
    return res.json(err.message);
  }
};
