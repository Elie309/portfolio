<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PersonalInfoController;
use App\Http\Controllers\SocialLinkController;
use App\Http\Controllers\ProjectController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Personal Info Routes
    Route::get('/personal-info', [PersonalInfoController::class, 'index'])->name('personal-info.index');
    Route::get('/personal-info/edit', [PersonalInfoController::class, 'edit'])->name('personal-info.edit');
    Route::post('/personal-info', [PersonalInfoController::class, 'store'])->name('personal-info.store');
    
    // Social Links Routes
    Route::resource('social-links', SocialLinkController::class);
    Route::post('/social-links/order', [SocialLinkController::class, 'updateOrder'])->name('social-links.order');
    
    // Projects Routes
    Route::resource('projects', ProjectController::class);
    Route::post('/projects/order', [ProjectController::class, 'updateOrder'])->name('projects.order');
    Route::patch('/projects/{project}/toggle-featured', [ProjectController::class, 'toggleFeatured'])->name('projects.toggle-featured');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
