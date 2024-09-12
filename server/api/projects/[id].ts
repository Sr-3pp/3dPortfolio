export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const db = hubDatabase();
  const projects = db
    .prepare(
      `
  SELECT * FROM projects WHERE id = ?1
  `
    )
    .bind(id);
  return projects.first();
});
