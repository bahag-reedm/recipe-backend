import { pool } from "../pool.js";

export const getUsers = async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    console.log(users);
    return res.json(users.rows);
  } catch (err) {
    return res.json(err.message);
  }
};
