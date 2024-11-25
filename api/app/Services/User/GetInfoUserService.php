<?php

namespace App\Services\User;

use App\Contracts\UserContract;
use App\Exceptions\NotFoundException;

class GetInfoUserService
{
    public function __construct(
        private UserContract $repository
    ) {}
    public function execute(int $id): array 
    {
        $userAlreadyExists = $this->repository->findById($id);
        if(empty($userAlreadyExists)) {
            throw new NotFoundException("Usuário Não foi encontrado em Nossa Base de Dados!");
        }
        
        $infoUser = $this->repository->findPatientInformation($id);
        return array(
            'status' => 200,
            'message' => 'Dados do Paciente Solicitado',
            'data' => $infoUser
        );
    }
}
