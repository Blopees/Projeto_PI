<?php 
namespace App\Contracts;

interface RemindersContract
{
    public function create(array $data): ?object;
    public function findByUserId(int $user_id): ?array;
}