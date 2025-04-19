<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects.
     */
    public function index()
    {
        $projects = Project::where('user_id', Auth::id())
            ->orderBy('display_order')
            ->get();
        
        return Inertia::render('projects/index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new project.
     */
    public function create()
    {
        return Inertia::render('projects/create');
    }

    /**
     * Store a newly created project.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'tags' => 'required|array',
            'demo_url' => 'nullable|url|max:255',
            'repo_url' => 'nullable|url|max:255',
            'display_order' => 'integer',
            'is_featured' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        $validated['user_id'] = Auth::id();
        $validated['tags'] = json_encode($validated['tags']);

        Project::create($validated);

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    /**
     * Show the form for editing the project.
     */
    public function edit(Project $project)
    {
        
        $project->tags = json_decode($project->tags);
        
        return Inertia::render('projects/edit', [
            'project' => $project,
        ]);
    }

    /**
     * Update the project.
     */
    public function update(Request $request, Project $project)
    {
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'tags' => 'required|array',
            'demo_url' => 'nullable|url|max:255',
            'repo_url' => 'nullable|url|max:255',
            'display_order' => 'integer',
            'is_featured' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        $validated['tags'] = json_encode($validated['tags']);
        
        $project->update($validated);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the project.
     */
    public function delete(Project $project)
    {
        
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }
        
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }

    /**
     * Update the display order of projects.
     */
    public function updateOrder(Request $request)
    {
        $request->validate([
            'projects' => 'required|array',
            'projects.*.id' => 'required|exists:projects,id',
            'projects.*.display_order' => 'required|integer',
        ]);

        foreach ($request->projects as $proj) {
            $project = Project::findOrFail($proj['id']);
            $project->update(['display_order' => $proj['display_order']]);
        }

        return response()->json(['message' => 'Display order updated successfully']);
    }

    /**
     * Toggle featured status for a project.
     */
    public function toggleFeatured(Project $project)
    {
        
        $project->update([
            'is_featured' => !$project->is_featured
        ]);

        return redirect()->route('projects.index')->with('success', 'Project featured status updated.');
    }
}
