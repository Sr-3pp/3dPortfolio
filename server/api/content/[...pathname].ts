export default defineEventHandler(async (event) => {
  const { pathname } = getRouterParams(event);
  const { sections, section } = getQuery(event);
  const content: any = await hubBlob().serve(event, pathname);

  if (sections) {
    const data: any = {};
    (sections as string).split(",").forEach((sec: string) => {
      data[sec as string] = content[sec];
    });
    return data;
  } else if (section) {
    return content[section as string];
  }

  return content;
});
