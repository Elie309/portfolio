<?php

namespace App\Http\Controllers;

use App\Models\SocialLink;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SocialLinkController extends Controller
{
    /**
     * Display a listing of social links.
     */
    public function index()
    {
        $socialLinks = SocialLink::where('user_id', Auth::id())
            ->orderBy('display_order')
            ->get();
        
        return Inertia::render('SocialLinks/Index', [
            'socialLinks' => $socialLinks,
        ]);
    }

    /**
     * Show the form for creating a new social link.
     */
    public function create()
    {
        return Inertia::render('SocialLinks/Create');
    }

    /**
     * Store a newly created social link.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'icon' => 'required|string',
            'display_order' => 'integer',
        ]);

        $validated['user_id'] = Auth::id();

        SocialLink::create($validated);

        return redirect()->route('social-links.index')->with('success', 'Social link created successfully.');
    }

    /**
     * Show the form for editing the social link.
     */
    public function edit(SocialLink $socialLink)
    {
        
        return Inertia::render('SocialLinks/Edit', [
            'socialLink' => $socialLink,
        ]);
    }

    /**
     * Update the social link.
     */
    public function update(Request $request, SocialLink $socialLink)
    {
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'icon' => 'required|string',
            'display_order' => 'integer',
        ]);

        $socialLink->update($validated);

        return redirect()->route('social-links.index')->with('success', 'Social link updated successfully.');
    }

    /**
     * Remove the social link.
     */
    public function destroy(SocialLink $socialLink)
    {
        
        $socialLink->delete();

        return redirect()->route('social-links.index')->with('success', 'Social link deleted successfully.');
    }

    /**
     * Update the display order of social links.
     */
    public function updateOrder(Request $request)
    {
        $request->validate([
            'links' => 'required|array',
            'links.*.id' => 'required|exists:social_links,id',
            'links.*.display_order' => 'required|integer',
        ]);

        foreach ($request->links as $link) {
            $socialLink = SocialLink::findOrFail($link['id']);
            $socialLink->update(['display_order' => $link['display_order']]);
        }

        return response()->json(['message' => 'Display order updated successfully']);
    }
}
