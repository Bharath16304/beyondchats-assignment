<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // GET /api/articles
    public function index()
    {
        return response()->json(
            Article::latest()->paginate(10)
        );
    }

    // POST /api/articles
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'source_url' => 'nullable|url',
        ]);

        $article = Article::create([
            ...$validated,
            'is_updated' => false,
        ]);

        return response()->json($article, 201);
    }

    // GET /api/articles/{id}
    public function show(Article $article)
    {
        return response()->json($article);
    }

    // PUT /api/articles/{id}
    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'source_url' => 'nullable|url',
        ]);

        $article->update([
            ...$validated,
            'is_updated' => true,
        ]);

        return response()->json($article);
    }

    // DELETE /api/articles/{id}
    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['message' => 'Article deleted']);
    }
}
