<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientDetails extends Model
{
    protected $fillable = [
        'value',
        'user_id',
        'helth_metrics_id',
        'date_emission'
    ];
}
