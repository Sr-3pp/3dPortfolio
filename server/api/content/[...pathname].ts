export default defineEventHandler(async (event) => {
  const { pathname } = getRouterParams(event);
  const { sections, section } = getQuery(event);
  const content: any = await hubBlob().serve(event, pathname);

  return content;
});
