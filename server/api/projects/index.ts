export default defineEventHandler(() => {
  const db = hubDatabase();
  const projects = db.prepare(`
  SELECT *
  FROM projects
  ORDER BY created_at DESC
  `);
  return projects.all();
});
