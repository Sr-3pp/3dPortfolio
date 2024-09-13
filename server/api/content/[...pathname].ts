export default defineEventHandler(async (event) => {
  const { pathname } = getRouterParams(event);
  const content = await hubBlob().serve(event, pathname);
  return content;
});
