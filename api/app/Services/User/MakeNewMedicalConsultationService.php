<?php

namespace App\Services\User;

use App\Contracts\MedicalSchedulingContract;
use App\Contracts\UserContract;
use App\Exceptions\AuthorizationException;
use App\Exceptions\ConflitException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ServerException;
use Exception;
use Illuminate\Support\Facades\DB;

class MakeNewMedicalConsultationService
{
    public function __construct(
        private UserContract $repository,
        private MedicalSchedulingContract $medicalSchedulingRepository
    ) {}

    public function execute(array $data): array 
    {
        $userAlreadyExists = $this->repository->findById($data['pacient_id']);
        if(empty($userAlreadyExists)) {
            throw new NotFoundException("Usuário Não foi encontrado em Nossa Base de Dados!");
        }

        if($userAlreadyExists->profile_id == 2) {
            throw new AuthorizationException('Apenas Pacientes podem Cadastrar uma Consulta');
        }

        $medicalSchedulingAlreadyExists = $this->medicalSchedulingRepository->findById($data['medical_scheduling_id']);
        if(empty($medicalSchedulingAlreadyExists)) {
            throw new NotFoundException("Data Passada Pelo Médico Não foi encontrada em Nossa Base de Dados!");
        }

        if($medicalSchedulingAlreadyExists->scheduled_appointment == 1) {
            throw new ConflitException('Essa Data Não está Disponível para Agendamento!');
        }
        
        DB::beginTransaction();
        try {
            $userAlreadyExists->medicalScheduling()->attach($data['medical_scheduling_id']);
            $medicalSchedulingAlreadyExists->scheduled_appointment = 1;
            $medicalSchedulingAlreadyExists->save();
            DB::commit();

            return array(
                'status' => 201,
                'message' => 'Agendamento foi Realizado com Sucesso!'
            );
        }catch(Exception $e) {
            DB::rollBack();
            throw new ServerException('Erro foi Gerado No Agendamento da Consulta! Por Favor, tente Novamente!');
        }
    }
}
