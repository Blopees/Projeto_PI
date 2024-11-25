<?php

namespace App\Services\User;

use App\Contracts\PatientDetailsContract;
use App\Contracts\UserContract;
use App\Exceptions\NotFoundException;
use App\Exceptions\ServerException;

class CadNewUserInfoService
{
    public function __construct(
        private PatientDetailsContract $repository,
        private UserContract $userRepository
    ) {}

    public function execute(array $data): array 
    {
        $userAlreadyExists = $this->userRepository->findById($data['user_id']);
        if(empty($userAlreadyExists)) {
            throw new NotFoundException("Usuário Não foi encontrado em Nossa Base de Dados!");
        }

        $userInfo = $this->repository->create($data);
        if(!$userInfo) {
            throw new ServerException("Erro ao Adicionar os Dados do Paciente, Tente Novamente!");
        }

        return array(
            'status' => 201,
            'message' => 'Dados do Cliente Foram Adicionados com Sucesso!',
            'data' => [
                'name' => $userAlreadyExists->name,
                'email' => $userAlreadyExists->email,
                'profile_id' => $userAlreadyExists->profile_id, 
                'phone_number' => $userAlreadyExists->phone_number
            ],
        );
    }
}
