import axios from "axios";

export async function searchGoogle(query) {
  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    throw new Error("Missing SERPAPI_KEY in .env");
  }

  const response = await axios.get("https://serpapi.com/search", {
    params: {
      q: query,
      engine: "google",
      api_key: apiKey,
      num: 5
    }
  });

  const results = response.data.organic_results || [];

  // Return first 2 blog/article links
  return results
    .filter(r => r.link && !r.link.includes("google.com"))
    .slice(0, 2)
    .map(r => r.link);
}
