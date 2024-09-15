import { BlobType } from "@nuxthub/core";

export default defineEventHandler(async (event) => {
  const form = await readFormData(event);
  const file = form.get("file") as File;

  if (!file || !file.size) {
    throw createError({ statusCode: 400, message: "No file provided" });
  }

  ensureBlob(file, {
    maxSize: "1MB",
    types: (form.get("types") as string).split(",") as BlobType[],
  });

  return hubBlob().put(file.name, file, {
    addRandomSuffix: false,
    prefix: form.get("prefix") as string,
  });
});
