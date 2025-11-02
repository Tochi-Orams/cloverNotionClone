import { getDb } from "../lib/db";

async function initDb() {
  const db = await getDb();
  await db.exec(`
        CREATE TABLE IF NOT EXISTS blocks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT NOT NULL,
          name TEXT NOT NULL,
          image_source TEXT,
          content JSON
          width INT,
          height INT
        );
      `);
  console.log("Database initialized.");
}

initDb();
