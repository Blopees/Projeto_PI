<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicalConsultation extends Model
{
    protected $fillable = [
        'medical_scheduling_id',
        'patient_id'
    ];
}
