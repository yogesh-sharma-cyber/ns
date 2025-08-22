import pkg from 'pg';
const { Pool } = pkg;

let pool = null;

export const initDB = (config) => {
  pool = new Pool(config);
  return pool;
};

export const getDB = () => {
  if (!pool) throw new Error("Database not initialized!");
  return pool;
};
