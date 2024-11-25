<?php

namespace App\Services\User;

use App\Contracts\UserContract;
use App\Exceptions\AuthorizationException;
use App\Exceptions\NotFoundException;

class GetAllDoctorMedicalConsultationService
{
    public function __construct(
        private UserContract $repository
    ) {}

    public function execute($doctor_id): array
    {
        $userAlreadyExists = $this->repository->findById($doctor_id);
        if(empty($userAlreadyExists)) {
            throw new NotFoundException("Usuário Não foi encontrado em Nossa Base de Dados!");
        }

        if($userAlreadyExists->profile_id == 1) {
            throw new AuthorizationException('Apenas Médicos podem Acessar as Informações de Consultas dos Pacientes');
        }

        $medicalConsultation = $this->repository->getDoctorConsults($doctor_id);
        $message = "Você Possui Consultas Marcadas para a Data de Hoje!";
        if(empty($medicalConsultation)) {
            $message = "Você Não Possui Consultas Marcadas Para a Data de Hoje Até o Momento.";
        }
        return array(
            'status' => 200,
            'message' => $message,
            'data' => $medicalConsultation
        );
    } 
}
