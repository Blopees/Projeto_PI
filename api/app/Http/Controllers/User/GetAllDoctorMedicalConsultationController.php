<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\GetAllDoctorMedicalConsultationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetAllDoctorMedicalConsultationController extends Controller
{
    public function __construct(
        private GetAllDoctorMedicalConsultationService $service
    ) {}

    public function handle():JsonResponse
    {
        $userId = Auth::user()->id;
        $response = $this->service->execute($userId);
        return response()->json($response, $response['status']);
    }
}
