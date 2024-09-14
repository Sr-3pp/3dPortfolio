export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const projects = (await useDrizzle().select().from(tables.projects)).find(
    (p) => p.id === Number(id)
  );

  return projects;
});
