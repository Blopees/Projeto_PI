<?php

namespace App\Repositories;

use App\Contracts\MedicalSchedulingContract;
use App\Models\MedicalScheduling;

class MedicalSchedulingRepository implements MedicalSchedulingContract
{
    private MedicalScheduling $repository;
    public function __construct()
    {
        $this->repository = app(MedicalScheduling::class);
    }

    public function create(array $data): ?object
    {
        return $this->repository->create($data);
    }

    public function findById(int $id): ?object
    {
        return $this->repository?->find($id);
    }

    public function findByUserId(int $user_id): ?array
    {
        return $this->repository->where('doctor_id', $user_id)->get()?->toArray();
    }

    public function findByAppointmentDate(int $user_id, string $appointment_date): ?object
    {
        return $this->repository->where('doctor_id', $user_id)
                                ->where('appointment_date', $appointment_date)
                                ->first();
    }
}
