// Creates the tables defined in db/schema.sql
// Usage: npm run db:init   (reads DATABASE_URL from .env.local)
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import pg from "pg";

const dir = path.dirname(fileURLToPath(import.meta.url));
const sql = await readFile(path.join(dir, "..", "db", "schema.sql"), "utf8");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Create .env.local from .env.example first.");
  process.exit(1);
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
try {
  await client.connect();
  await client.query(sql);
  console.log("Database schema created successfully.");
} catch (err) {
  console.error("Failed to initialise database:", err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
