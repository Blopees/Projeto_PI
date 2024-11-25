<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicalScheduling extends Model
{
    protected $fillable = [
        'doctor_id',
        'appointment_date',
        'scheduled_appointment'
    ];
}
