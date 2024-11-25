<?php

namespace App\Http\Controllers\Reminders;

use App\Http\Controllers\Controller;
use App\Services\Reminders\CreateNewReminderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CreateNewReminderController extends Controller
{
    public function __construct(
        private CreateNewReminderService $service
    ) {}

    public function handle(Request $request):JsonResponse
    {
        $userId = Auth::user()->id;
        $request->merge(['user_id' => $userId]);
        $response = $this->service->execute($request->all());
        return response()->json($response, $response['status']);
    }
}
