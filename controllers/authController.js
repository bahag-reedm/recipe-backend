import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db/db.js";
import { eq } from "drizzle-orm";
import { users } from "../db/schema.js";

export const createUser = async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;
  const profileImage = req.file ? req.file.path : null;

  if (!username || !password || !firstName || !lastName) {
    return res.status(400).json({
      message:
        "Must provide values for username, password, email, firstname and lastname",
    });
  }

  const verify = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (verify) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const result = await db
      .insert(users)
      .values({
        username,
        password: hashedPassword,
        email,
        firstName,
        lastName,
        profileImage,
      })
      .returning();
    return res.status(201).json(result[0]);
  } catch (err) {
    return res.json(err.message);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Must provide email and password" });
  }

  const verify = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!verify) {
    return res.status(400).json({ message: "Wrong email or password" });
  }

  const verifyPassword = await bcrypt.compare(password, verify.password);

  if (!verifyPassword) {
    return res.status(400).json({ message: "Wrong email or password" });
  }

  const token = jwt.sign({ id: verify.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
};

export const getUser = async (req, res) => {
  const { id } = req.token;
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!user) {
      res.status(400).json({ message: "No User was found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500);
  }
};
