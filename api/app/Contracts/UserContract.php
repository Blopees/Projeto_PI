<?php 
namespace App\Contracts;

interface UserContract
{
    public function create(array $data): ?object;
    public function findById(int $id): ?object;
    public function findByEmail(string $email): ?object;
    public function findPatientInformation(int $id): ?array;
    public function getDoctorConsults(int $id): ?array;
}