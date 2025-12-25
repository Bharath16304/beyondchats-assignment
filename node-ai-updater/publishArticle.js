import axios from "axios";

export async function publishArticle(title, content, sources) {
  return axios.post(process.env.LARAVEL_API, {
    title,
    content: content + `\n\nReferences:\n${sources.join("\n")}`,
    is_updated: true
  });
}
