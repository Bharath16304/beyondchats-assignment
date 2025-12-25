import "dotenv/config";
import axios from "axios";

import { fetchLatestArticle } from "./fetchLatestArticle.js";
import { searchGoogle } from "./searchGoogle.js";
import { scrapeArticle } from "./scrapeArticle.js";
import { rewriteArticle } from "./rewriteWithLLM.js";
import { publishArticle } from "./publishArticle.js";

async function run() {
  try {
    // 🔍 DEBUG (remove later if you want)
    console.log("Gemini key loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");

    console.log("Fetching latest article from Laravel...");
    const article = await fetchLatestArticle();

    if (!article) {
      console.log("No article found.");
      return;
    }

    console.log("Article title:", article.title);

    console.log("Searching Google...");
    const links = await searchGoogle(article.title);

    if (!links || links.length < 2) {
      console.log("Not enough Google results found.");
      return;
    }

    console.log("Scraping reference articles...");
    const referenceArticles = [];

    for (const link of links.slice(0, 2)) {
      const content = await scrapeArticle(link);

      if (content && content.length > 200) {
        referenceArticles.push({
          content,
          url: link
        });
      }
    }

    if (referenceArticles.length < 2) {
      console.log("Not enough reference article content.");
      return;
    }

    console.log("Scraping completed.");
    console.log("Rewriting article using Gemini...");

    const updatedContent = await rewriteArticle(article, referenceArticles);

    console.log("Publishing updated article...");
    await publishArticle(article.id, {
      title: article.title,
      content: updatedContent,
      is_updated: true
    });

    console.log("✅ Article rewritten & published successfully!");
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

run();
