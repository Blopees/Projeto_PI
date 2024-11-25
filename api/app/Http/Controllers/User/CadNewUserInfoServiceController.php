<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\CadNewUserInfoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CadNewUserInfoServiceController extends Controller
{
    public function __construct(
        private CadNewUserInfoService $service
    ) {}

    public function handle(Request $request):JsonResponse
    {
        $userId = Auth::user()->id;
        $request->merge(['user_id' => $userId]);
        $response = $this->service->execute($request->all());
        return response()->json($response, $response['status']);
    }
}
