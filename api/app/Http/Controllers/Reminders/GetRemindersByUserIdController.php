<?php

namespace App\Http\Controllers\Reminders;

use App\Http\Controllers\Controller;
use App\Services\Reminders\GetRemindersByUserIdService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class GetRemindersByUserIdController extends Controller
{
    public function __construct(
        private GetRemindersByUserIdService $service
    ) {}

    public function handle():JsonResponse
    {
        $userId = Auth::user()->id;
        $response = $this->service->execute($userId);
        return response()->json($response, $response['status']);
    }
}
