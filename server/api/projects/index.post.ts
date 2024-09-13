export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const db = hubDatabase();
  await db
    .prepare(
      `
  INSERT INTO projects (name, description, photo)
  VALUES ('${data.name}', '${data.description}', '${data.photo}')
  `
    )
    .run();
  return {
    message: "Project created",
  };
});
