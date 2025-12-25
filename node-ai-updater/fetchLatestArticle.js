import axios from "axios";

export async function fetchLatestArticle() {
  const res = await axios.get(process.env.LARAVEL_API);
  return res.data.data[0]; // latest article
}
