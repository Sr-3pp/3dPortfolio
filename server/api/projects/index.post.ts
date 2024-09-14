export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const project = await useDrizzle().insert(tables.projects).values(data);

  return {
    message: "Project created",
    data: project,
  };
});
