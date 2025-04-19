<?php

namespace App\Http\Controllers;

use App\Models\PersonalInfo;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PersonalInfoController extends Controller
{
    /**
     * Display the personal info.
     */
    public function index()
    {
        $personalInfo = PersonalInfo::where('user_id', Auth::id())->first();
        
        return Inertia::render('PersonalInfo/Index', [
            'personalInfo' => $personalInfo,
        ]);
    }

    /**
     * Show the form for creating/editing personal info.
     */
    public function edit()
    {
        $personalInfo = PersonalInfo::where('user_id', Auth::id())->first();
        
        return Inertia::render('PersonalInfo/Edit', [
            'personalInfo' => $personalInfo,
        ]);
    }

    /**
     * Store or update personal info.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'about_content' => 'required|string',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
        ]);

        PersonalInfo::updateOrCreate(
            ['user_id' => Auth::id()],
            $validated
        );

        return redirect()->route('personal-info.index')->with('success', 'Personal information updated successfully.');
    }
}
