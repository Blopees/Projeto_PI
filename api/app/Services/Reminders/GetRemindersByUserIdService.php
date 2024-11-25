<?php

namespace App\Services\Reminders;

use App\Contracts\RemindersContract;
use App\Contracts\UserContract;
use App\Exceptions\NotFoundException;

class GetRemindersByUserIdService
{
    public function __construct(
        private RemindersContract $repository,
        private UserContract $userRepository
    ) {}

    public function execute(int $user_id): array 
    {
        $userAlreadyExists = $this->userRepository->findById($user_id);
        if(empty($userAlreadyExists)) {
            throw new NotFoundException("Usuário Não foi encontrado em Nossa Base de Dados!");
        }

        $reminders = $this->repository->findByUserId($user_id);
        return array(
            'status' => 200,
            'message' => 'Lembrete do Usuário Encontrados Com Sucesso!',
            'data' => $reminders
        );
    }
}
