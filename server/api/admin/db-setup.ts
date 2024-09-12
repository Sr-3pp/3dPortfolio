export default defineEventHandler(() => {
  //todo add admin middleware an protecction to this context
  const db = hubDatabase();
  const projects = db.prepare(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      photo TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  projects.run();
  return {
    message: "Database setup complete",
  };
});
