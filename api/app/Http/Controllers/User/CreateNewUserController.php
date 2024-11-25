<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\CreateNewUserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CreateNewUserController extends Controller
{
    public function __construct(
        private CreateNewUserService $service
    ) {}

    public function handle(Request $request):JsonResponse
    {
        $response = $this->service->execute($request->all());
        return response()->json($response, $response['status']);
    }
}
