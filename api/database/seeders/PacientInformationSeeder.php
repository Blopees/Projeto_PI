<?php

namespace Database\Seeders;

use App\Models\PatientDetails;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PacientInformationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PatientDetails::create([
            "value" => 100,
            "helth_metrics_id" => 1,
            "user_id" => 3,
            "date_emission" => "2024-11-16 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 150,
            "helth_metrics_id" => 2,
            "user_id" => 3,
            "date_emission" => "2024-11-16 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 100,
            "helth_metrics_id" => 1,
            "user_id" => 3,
            "date_emission" => "2024-11-17 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 140,
            "helth_metrics_id" => 2,
            "user_id" => 3,
            "date_emission" => "2024-11-17 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 120,
            "helth_metrics_id" => 1,
            "user_id" => 3,
            "date_emission" => "2024-11-18 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 200,
            "helth_metrics_id" => 2,
            "user_id" => 3,
            "date_emission" => "2024-11-18 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 180,
            "helth_metrics_id" => 1,
            "user_id" => 3,
            "date_emission" => "2024-11-19 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 110,
            "helth_metrics_id" => 2,
            "user_id" => 3,
            "date_emission" => "2024-11-19 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 100,
            "helth_metrics_id" => 1,
            "user_id" => 3,
            "date_emission" => "2024-11-20 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 150,
            "helth_metrics_id" => 2,
            "user_id" => 3,
            "date_emission" => "2024-11-20 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 110,
            "helth_metrics_id" => 1,
            "user_id" => 3,
            "date_emission" => "2024-11-21 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 190,
            "helth_metrics_id" => 2,
            "user_id" => 3,
            "date_emission" => "2024-11-21 10:25:10"
        ]);


        PatientDetails::create([
            "value" => 120,
            "helth_metrics_id" => 3,
            "user_id" => 3,
            "date_emission" => "2024-11-16 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 120,
            "helth_metrics_id" => 3,
            "user_id" => 3,
            "date_emission" => "2024-11-17 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 110,
            "helth_metrics_id" => 3,
            "user_id" => 3,
            "date_emission" => "2024-11-18 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 135,
            "helth_metrics_id" => 3,
            "user_id" => 3,
            "date_emission" => "2024-11-19 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 120,
            "helth_metrics_id" => 3,
            "user_id" => 3,
            "date_emission" => "2024-11-20 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 140,
            "helth_metrics_id" => 3,
            "user_id" => 3,
            "date_emission" => "2024-11-21 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 80,
            "helth_metrics_id" => 4,
            "user_id" => 3,
            "date_emission" => "2024-11-16 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 75,
            "helth_metrics_id" => 4,
            "user_id" => 3,
            "date_emission" => "2024-11-17 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 85,
            "helth_metrics_id" => 4,
            "user_id" => 3,
            "date_emission" => "2024-11-18 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 89,
            "helth_metrics_id" => 4,
            "user_id" => 3,
            "date_emission" => "2024-11-19 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 70,
            "helth_metrics_id" => 4,
            "user_id" => 3,
            "date_emission" => "2024-11-20 10:25:10"
        ]);

        PatientDetails::create([
            "value" => 60,
            "helth_metrics_id" => 4,
            "user_id" => 3,
            "date_emission" => "2024-11-21 10:25:10"
        ]);
    }
}
