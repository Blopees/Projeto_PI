<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class ConflitException extends Exception
{
    protected $message;

    public function __construct(
        string $message
    ) {
        $this->message    = $message;
        $this->code       = 409;
    }

    public function render(): JsonResponse
    {
        return response()->json([
            'message' => $this->message,
        ], $this->code);
    }
}
