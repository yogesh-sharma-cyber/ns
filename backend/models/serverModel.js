import { getDB } from "../db.js";

export const createServerTable = async () => {
  const db = getDB();
  await db.query(`
    CREATE TABLE IF NOT EXISTS servers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      ip VARCHAR(100) NOT NULL
    )
  `);
};

export const addServer = async (name, ip) => {
  const db = getDB();
  await createServerTable();
  await db.query("INSERT INTO servers(name, ip) VALUES($1, $2)", [name, ip]);
};

export const getServers = async () => {
  const db = getDB();
  await createServerTable();
  const res = await db.query("SELECT * FROM servers ORDER BY id DESC");
  return res.rows;
};

export const deleteServer = async (id) => {
  const db = getDB();
  await db.query("DELETE FROM servers WHERE id=$1", [id]);
};