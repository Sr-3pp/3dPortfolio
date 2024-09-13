export default defineEventHandler(async () => {
  const { blobs } = await hubBlob().list({ limit: 10, prefix: "img" });
  return blobs;
});
