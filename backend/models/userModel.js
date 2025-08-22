import { getDB } from "../db.js";
import bcrypt from "bcrypt";

export const createUser = async (username, password) => {
  const hashed = await bcrypt.hash(password, 10);
  const db = getDB();
  await db.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
  await db.query("INSERT INTO users(username, password) VALUES($1, $2)", [username, hashed]);
};

export const findUser = async (username) => {
  const db = getDB();
  const res = await db.query("SELECT * FROM users WHERE username=$1", [username]);
  return res.rows[0];
};
