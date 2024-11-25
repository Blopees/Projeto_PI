<?php 
namespace App\Contracts;
interface MedicalSchedulingContract
{
    public function create(array $data): ?object;
    public function findById(int $id): ?object;
    public function findByUserId(int $user_id): ?array;
}