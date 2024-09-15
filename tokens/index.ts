import fs from "fs";
import { join } from "pathe";
import tokenizer from "json-to-var";

const tokensDir = join(process.cwd(), "tokens", "src");

const jsonTokens = fs.readdirSync(tokensDir).map((file) => {
  const json = fs.readFileSync(`${tokensDir}/${file}`, "utf-8");
  return JSON.parse(json);
});

const jsTokens = tokenizer.toJs(jsonTokens);
tokenizer.makeFile("./assets/tokens", "index.js", jsTokens);

const scssTokens = tokenizer.toScss(jsonTokens);
tokenizer.makeFile("./assets/scss", "tokens.scss", scssTokens);
