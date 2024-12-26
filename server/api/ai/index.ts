export default defineEventHandler(async (event) => {
  const { question } = await readBody(event);
  const ai = hubAI(); // access AI bindings
  return await ai.run("@cf/meta/llama-3.1-8b-instruct", {
    prompt: question,
  });
});
