import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeArticle(url) {
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  // Try common article selectors
  const content = $("article").text().trim() ||
                  $("main").text().trim() ||
                  $("body").text().trim();

  return content.replace(/\s+/g, " ").slice(0, 4000);
}
