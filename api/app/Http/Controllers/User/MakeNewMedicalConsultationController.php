<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\MakeNewMedicalConsultationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MakeNewMedicalConsultationController extends Controller
{
    public function __construct(
        private MakeNewMedicalConsultationService $service
    ) {}

    public function handle(Request $request):JsonResponse
    {
        $userId = Auth::user()->id;
        $request->merge(['pacient_id' => $userId]);
        $response = $this->service->execute($request->all());
        return response()->json($response, $response['status']);
    }
}
