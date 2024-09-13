export default defineEventHandler(async (event) => {
  const { blobs } = await hubBlob().list({ limit: 10, prefix: "content" });
  return blobs;
});
