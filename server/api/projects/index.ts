export default defineEventHandler(async () => {
  const projects = await useDrizzle().select().from(tables.projects).all();

  return projects;
});
