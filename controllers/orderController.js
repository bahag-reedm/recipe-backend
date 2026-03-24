import { pool } from "../pool.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await pool.query("SELECT * FROM orders");
    console.log(orders);
    return res.json(orders.rows);
  } catch (err) {
    return res.json(err.message);
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await pool.query(`SELECT * FROM orders WHERE id=$1`, [id]);
    console.log(orders);
    return res.json(orders.rows);
  } catch (err) {
    return res.json(err.message);
  }
};
