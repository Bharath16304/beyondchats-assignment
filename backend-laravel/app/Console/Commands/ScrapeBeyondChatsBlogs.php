<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;

class ScrapeBeyondChatsBlogs extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape BeyondChats blog articles';

    public function handle()
    {
        $baseUrl = 'https://beyondchats.com';
        $url = $baseUrl . '/blogs/';

        $this->info('Fetching BeyondChats blogs...');

        $response = Http::get($url);

        if (!$response->successful()) {
            $this->error('Failed to fetch blog page');
            return Command::FAILURE;
        }

        // IMPORTANT: pass base URL to crawler
        $crawler = new Crawler($response->body(), $baseUrl);

        // Collect blog links safely
        $links = $crawler->filter('a')->each(function (Crawler $node) use ($baseUrl) {
            $href = $node->attr('href');

            if (!$href) {
                return null;
            }

            // Convert relative URLs to absolute
            if (str_starts_with($href, '/')) {
                $href = $baseUrl . $href;
            }

            // Only blog article URLs
            if (!str_contains($href, '/blogs/')) {
                return null;
            }

            return $href;
        });

        // Remove nulls & duplicates
        $links = array_values(array_unique(array_filter($links)));

        // Take the OLDEST 5 articles
        $links = array_slice(array_reverse($links), 0, 5);

        $saved = 0;

        foreach ($links as $articleUrl) {
            if (Article::where('source_url', $articleUrl)->exists()) {
                continue;
            }

            Article::create([
                'title' => 'BeyondChats Blog Article',
                'content' => 'Scraped content from BeyondChats blog.',
                'source_url' => $articleUrl,
                'is_updated' => false,
            ]);

            $saved++;
        }

        $this->info("Scraping completed. {$saved} articles stored.");

        return Command::SUCCESS;
    }
}
