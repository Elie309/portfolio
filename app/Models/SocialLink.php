<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'url',
        'icon',
        'display_order',
        'user_id',
    ];

    /**
     * Get the user that owns the social link.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
