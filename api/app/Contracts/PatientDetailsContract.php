<?php 
namespace App\Contracts;
interface PatientDetailsContract
{
    public function create(array $data): ?object;
}