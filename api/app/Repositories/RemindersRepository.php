<?php

namespace App\Repositories;

use App\Contracts\RemindersContract;
use App\Models\Reminders;

class RemindersRepository implements RemindersContract
{
    private Reminders $repository;
    public function __construct()
    {
        $this->repository = app(Reminders::class);
    }

    public function create(array $data): ?object
    {
        return $this->repository->create($data);
    }

    public function findByUserId(int $user_id): ?array
    {
        return $this->repository->select('id', 'title', 'message')
                                ->where('user_id', $user_id)->get()?->toArray();
    }
}
