<?php

namespace App\Providers;

use App\Contracts\MedicalSchedulingContract;
use App\Contracts\PatientDetailsContract;
use App\Contracts\RemindersContract;
use App\Contracts\UserContract;
use App\Repositories\MedicalSchedulingRepository;
use App\Repositories\PatientDetailsRepository;
use App\Repositories\RemindersRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserContract::class, UserRepository::class);
        $this->app->bind(PatientDetailsContract::class, PatientDetailsRepository::class);
        $this->app->bind(RemindersContract::class, RemindersRepository::class);
        $this->app->bind(MedicalSchedulingContract::class, MedicalSchedulingRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
