<?php

namespace App\Http\Controllers;

use App\Models\PersonalInfo;
use App\Models\Project;
use App\Models\SocialLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $personalInfo = PersonalInfo::where('user_id', $user->id)->first();
        $projects = Project::where('user_id', $user->id)->orderBy('display_order')->get();
        $socialLinks = SocialLink::where('user_id', $user->id)->orderBy('display_order')->get();
        
        $stats = [
            'projects' => $projects->count(),
            'social_links' => $socialLinks->count(),
        ];
        
        return Inertia::render('Dashboard', [
            'personalInfo' => $personalInfo,
            'projects' => [],
            'socialLinks' => $socialLinks,
            'stats' => $stats,
        ]);
    }
}
