import { Pool } from "pg";

// Reuse one pool across hot reloads in development
const globalForPg = globalThis as unknown as { pgPool?: Pool };

export const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") globalForPg.pgPool = pool;

export type User = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

export async function findUserByEmail(email: string): Promise<User | null> {
  const { rows } = await pool.query<User>(
    "SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1",
    [email]
  );
  return rows[0] ?? null;
}

export async function findUserById(id: number): Promise<User | null> {
  const { rows } = await pool.query<User>("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0] ?? null;
}

export async function createUser(name: string, email: string, passwordHash: string): Promise<User> {
  const { rows } = await pool.query<User>(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, LOWER($2), $3)
     RETURNING *`,
    [name, email, passwordHash]
  );
  return rows[0];
}
