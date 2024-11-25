<?php

namespace App\Services\MedicalScheduling;

use App\Contracts\MedicalSchedulingContract;
use App\Contracts\UserContract;
use App\Exceptions\NotFoundException;
use DateTime;

class GetMedicalSchedulingByDoctorIdService
{
    public function __construct(
        private MedicalSchedulingContract $repository,
        private UserContract $userRepository
    ) {}

    public function execute(int $doctor_id): array 
    {
        $userAlreadyExists = $this->userRepository->findById($doctor_id);
        if(empty($userAlreadyExists)) {
            throw new NotFoundException("Doutor Informado Não foi encontrado em Nossa Base de Dados!");
        }

        if($userAlreadyExists->profile_id == 1) {
            throw new NotFoundException("Usuário Informado Não É Um Doutor!");
        }

        $medicalScheduling = $this->repository->findByUserId($doctor_id);
        $currentDate = new DateTime();

        $medicalSchedulingFilter = array_filter($medicalScheduling, function ($item) use ($currentDate) {
            $dataTimestamp = new DateTime($item['appointment_date']);
            return $dataTimestamp > $currentDate && $item['scheduled_appointment'] == 0;
        });

        $message = "Horários de Agendamento do do Usuário Encontrados Com Sucesso!";
        if(empty($medicalSchedulingFilter)) {
            $message = "Seu Médico Não Possui Horários Disponíveis No Momento!";
        }

        return array(
            'status'  => 200,
            'message' => $message,
            'data' => array_values($medicalSchedulingFilter)
        );
    }
}
