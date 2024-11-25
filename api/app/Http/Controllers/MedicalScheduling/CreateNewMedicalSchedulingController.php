<?php

namespace App\Http\Controllers\MedicalScheduling;

use App\Http\Controllers\Controller;
use App\Services\MedicalScheduling\CreateNewMedicalSchedulingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CreateNewMedicalSchedulingController extends Controller
{
    public function __construct(
        private CreateNewMedicalSchedulingService $service
    ) {}

    public function handle(Request $request):JsonResponse
    {
        $userId = Auth::user()->id;
        $request->merge(['doctor_id' => $userId]);
        $response = $this->service->execute($request->all());
        return response()->json($response, $response['status']);
    }
}
