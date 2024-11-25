<?php

namespace App\Services\Reminders;

use App\Contracts\RemindersContract;
use App\Contracts\UserContract;
use App\Exceptions\AuthorizationException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ServerException;

class CreateNewReminderService
{
    public function __construct(
        private RemindersContract $repository,
        private UserContract $userRepository
    ) {}

    public function execute(array $data): array 
    {
        $userAlreadyExists = $this->userRepository->findById($data['user_id']);
        if(empty($userAlreadyExists)) {
            throw new NotFoundException("Usuário Não foi encontrado em Nossa Base de Dados!");
        }

        if($userAlreadyExists->profile_id == 2) {
            throw new AuthorizationException('Apenas Pacientes podem Cadastrar Lembretes');
        }

        $reminder = $this->repository->create($data);
        if(!$reminder) {
            throw new ServerException('Erro ao Adicionar o Lembrete! Tente novamente');
        }

        return array(
            'status' => 201,
            'message' => 'Lembrete foi Adicionado Com Sucesso!',
        );
    }
}
