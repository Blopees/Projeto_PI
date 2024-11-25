<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reminders extends Model
{
    protected $fillable = [
        'title',
        'message',
        'user_id'
    ];
}
