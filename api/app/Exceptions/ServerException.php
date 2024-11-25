<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class ServerException extends Exception
{
    protected $message;

    public function __construct(
        string $message
    ) {
        $this->message    = $message;
        $this->code       = 500;
    }

    public function render(): JsonResponse
    {
        return response()->json([
            'message' => $this->message,
        ], $this->code);
    }
}
