<?php

namespace Database\Seeders;

use App\Models\MedicalScheduling;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicalSchedulingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MedicalScheduling::create([
            'doctor_id' => 4,
            'appointment_date' => '2024-11-25 10:00:00',
            'scheduled_appointment' => 0
        ]);

        MedicalScheduling::create([
            'doctor_id' => 4,
            'appointment_date' => '2024-11-25 11:00:00',
            'scheduled_appointment' => 0
        ]);

        MedicalScheduling::create([
            'doctor_id' => 4,
            'appointment_date' => '2024-11-25 15:00:00',
            'scheduled_appointment' => 0
        ]);

        MedicalScheduling::create([
            'doctor_id' => 4,
            'appointment_date' => '2024-11-26 10:00:00',
            'scheduled_appointment' => 0
        ]);

        MedicalScheduling::create([
            'doctor_id' => 4,
            'appointment_date' => '2024-11-26 14:00:00',
            'scheduled_appointment' => 0
        ]);

        MedicalScheduling::create([
            'doctor_id' => 4,
            'appointment_date' => '2024-11-28 10:00:00',
            'scheduled_appointment' => 0
        ]);

        MedicalScheduling::create([
            'doctor_id' => 4,
            'appointment_date' => '2024-11-28 14:00:00',
            'scheduled_appointment' => 0
        ]);

        MedicalScheduling::create([
            'doctor_id' => 4,
            'appointment_date' => '2024-11-28 15:00:00',
            'scheduled_appointment' => 0
        ]);
    }
}
