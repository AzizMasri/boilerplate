<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with(['category:id,name', 'user:id,name'])
            ->latest()
            ->get(['id', 'title', 'body', 'category_id', 'user_id'])
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    'category' => $post->category->name,
                    'user' => $post->user->name,
                ];
            });
        return Inertia::render('posts/index', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = PostCategory::select('id', 'name')->get();
        return Inertia::render('posts/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required',
            'category_id' => 'required'
        ]);
        try {
            Post::create(
                [
                    'title' => $request->title,
                    'body' => $request->body,
                    'category_id' => $request->category_id,
                    'user_id' => Auth::id()
                ]
            );
            return to_route('posts.index')->with('success', 'Post created successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        dd($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $post = Post::find($id);
        $categories = PostCategory::select('id', 'name')->get();
        return Inertia::render('posts/edit', [
            'post' => $post,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required',
            'category_id' => 'required'
        ]);
        try {
            Post::whereKey($id)->update(
                [
                    'title' => $request->title,
                    'body' => $request->body,
                    'category_id' => $request->category_id,
                ]
            );
            return to_route('posts.index')->with('success', 'Post updated successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $deleted = Post::whereKey($id)->delete();
            if (! $deleted) {
                return back()->with('error', 'Post not found.');
            }
            return back()->with('success', 'Post deleted successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
