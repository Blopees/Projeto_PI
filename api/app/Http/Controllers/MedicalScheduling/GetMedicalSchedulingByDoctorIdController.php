<?php

namespace App\Http\Controllers\MedicalScheduling;

use App\Http\Controllers\Controller;
use App\Services\MedicalScheduling\GetMedicalSchedulingByDoctorIdService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetMedicalSchedulingByDoctorIdController extends Controller
{
    public function __construct(
        private GetMedicalSchedulingByDoctorIdService $service
    ) {}

    public function handle(int $doctor_id):JsonResponse
    {
        $response = $this->service->execute($doctor_id);
        return response()->json($response, $response['status']);
    }
}
