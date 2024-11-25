<?php

namespace App\Services\User;

use App\Contracts\UserContract;
use App\Exceptions\ConflitException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ServerException;

class CreateNewUserService
{
    public function __construct(
        private UserContract $repository
    ) {}

    public function execute(array $data): array 
    {
        $userAlreadyExists = $this->repository->findByEmail($data['email']);
        if($userAlreadyExists) {
            throw new ConflitException("Email Solicitado Já Consta no Banco de Dados");
        }

        $user = $this->repository->create($data);
        if(!$user) {
            throw new ServerException("Erro ao Cadastrar o Cliente, Tente Novamente!");
        }

        $token = $user->createToken('auth.user.test', ['server:update'])->plainTextToken;
        return array(
            'status' => 201,
            'message' => 'Usuário Cadastrado com Sucesso!',
            'token' => $token
        );
    }
}
