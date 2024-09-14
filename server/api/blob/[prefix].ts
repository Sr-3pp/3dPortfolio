export default defineEventHandler(async (event) => {
  const { prefix } = getRouterParams(event);
  const { blobs } = await hubBlob().list({ prefix });
  return blobs;
});
