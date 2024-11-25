<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\AuthUserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthUserController extends Controller
{
    public function __construct(
        private AuthUserService $service
    ) {}

    public function handle(Request $request): JsonResponse
    {
        $response = $this->service->execute($request->all());
        return response()->json($response, $response['status']);
    }
}
