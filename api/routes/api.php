<?php

use App\Http\Controllers\MedicalScheduling\CreateNewMedicalSchedulingController;
use App\Http\Controllers\MedicalScheduling\GetMedicalSchedulingByDoctorIdController;
use App\Http\Controllers\Reminders\CreateNewReminderController;
use App\Http\Controllers\Reminders\GetRemindersByUserIdController;
use App\Http\Controllers\User\AuthUserController;
use App\Http\Controllers\User\CadNewUserInfoServiceController;
use App\Http\Controllers\User\CreateNewUserController;
use App\Http\Controllers\User\GetAllDoctorMedicalConsultationController;
use App\Http\Controllers\User\GetInfoUserController;
use App\Http\Controllers\User\MakeNewMedicalConsultationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthUserController::class, 'handle']);
Route::post('/user', [CreateNewUserController::class, 'handle']);
Route::post('/user/patient-information', [CadNewUserInfoServiceController::class, 'handle'])->middleware('auth:sanctum');
Route::get('/user/patient-information', [GetInfoUserController::class, 'handle'])->middleware('auth:sanctum');

Route::post('/user/reminder', [CreateNewReminderController::class, 'handle'])->middleware('auth:sanctum');
Route::get('/user/reminder', [GetRemindersByUserIdController::class, 'handle'])->middleware('auth:sanctum');

Route::post('/medical-scheduling', [CreateNewMedicalSchedulingController::class, 'handle'])->middleware('auth:sanctum');
Route::get('/medical-scheduling/{doctor_id}', [GetMedicalSchedulingByDoctorIdController::class, 'handle'])->middleware('auth:sanctum');

Route::post('/user/medical-consultation', [MakeNewMedicalConsultationController::class, 'handle'])->middleware('auth:sanctum');
Route::get('/user/medical-consultation', [GetAllDoctorMedicalConsultationController::class, 'handle'])->middleware('auth:sanctum');
