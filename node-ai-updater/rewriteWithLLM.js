import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function rewriteArticle(original, references) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are a professional blog editor.

Original article:
Title: ${original.title}
Content:
${original.content}

Reference articles:
${references
  .map(
    (r, i) =>
      `${i + 1}. ${r.title}\n${r.content}\nSource: ${r.url}`
  )
  .join("\n\n")}

TASK:
- Rewrite the original article
- Improve structure, clarity, and depth
- Match tone & formatting of reference articles
- Keep facts accurate
- Add a "References" section at the bottom
- Cite the reference URLs clearly

Return ONLY the rewritten article content.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
