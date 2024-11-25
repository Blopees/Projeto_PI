<?php

namespace App\Services\MedicalScheduling;

use App\Contracts\MedicalSchedulingContract;
use App\Contracts\UserContract;
use App\Exceptions\AuthorizationException;
use App\Exceptions\DupplicateException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ServerException;

class CreateNewMedicalSchedulingService
{
    public function __construct(
        private MedicalSchedulingContract $repository,
        private UserContract $userRepository
    ) {}

    public function execute(array $data): array 
    {
        $userAlreadyExists = $this->userRepository->findById($data['doctor_id']);
        if(empty($userAlreadyExists)) {
            throw new NotFoundException("Doutor Informado Não foi encontrado em Nossa Base de Dados!");
        }

        if($userAlreadyExists->profile_id == 1) {
            throw new AuthorizationException('Usuário Solicitado Não é Médico!');
        }

        $medicalSchedulingAlreadyDupplicated = $this->repository->findByAppointmentDate($data['doctor_id'], $data['appointment_date']);
        if($medicalSchedulingAlreadyDupplicated) {
            throw new DupplicateException('Um Agendamento Para esse Horário já foi Realizado');
        }

        $medicalScheduling = $this->repository->create($data);
        if(!$medicalScheduling) {
            throw new ServerException('Não foi Possível Adicionar o Agendamento do Horário, por favor tente novamente!');
        }

        return array(
            'status' => 201,
            'message' => 'Horário da Consulta foi Adicionado com Sucesso!'
        );
    }
}
