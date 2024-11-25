<?php

namespace App\Repositories;

use App\Contracts\PatientDetailsContract;
use App\Models\PatientDetails;

class PatientDetailsRepository implements PatientDetailsContract
{
    private PatientDetails $repository;
    public function __construct() 
    {
        $this->repository = app(PatientDetails::class);
    }

    public function create(array $data): ?object
    {
        return $this->repository->create($data);
    }
}
