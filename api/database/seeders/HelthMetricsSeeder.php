<?php

namespace Database\Seeders;

use App\Models\HelthMetrics;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HelthMetricsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HelthMetrics::create(['name' => 'Jejum', 'description' => '']);
        HelthMetrics::create(['name' => 'Pós-Refeição', 'description' => '']);
        HelthMetrics::create(['name' => 'Pressão Arterial', 'description' => '']);
        HelthMetrics::create(['name' => 'Batimentos Cardíacos', 'description' => '']);
    }
}
