<?php

namespace App\Services\User;

use App\Contracts\UserContract;
use App\Exceptions\NotFoundException;
use Illuminate\Support\Facades\Hash;

class AuthUserService
{
    public function __construct(
        private UserContract $repository,
        private Hash $hash
    ) {}

    public function execute(array $data): array 
    {
        $userAlreadyExists = $this->repository->findByEmail($data['email']);
        if(empty($userAlreadyExists)) {
            throw new NotFoundException('Login ou Senha Não Encontrado!');
        }

        if($userAlreadyExists->phone_number != $data['phone_number']) {
            throw new NotFoundException('Login ou Senha Não Encontrado!');
        }

        $checkPassword = $this->hash::check($data['password'], $userAlreadyExists->password);
        if(!$checkPassword) {
            throw new NotFoundException('Login ou Senha Não Encontrado!');
        }
        
        $token = $userAlreadyExists->createToken('auth.user.test', ['server:update'])->plainTextToken;
        return array(
            'data' => [
                'name' => $userAlreadyExists->name,
                'email' => $userAlreadyExists->email,
                'profile_id' => $userAlreadyExists->profile_id, 
                'phone_number' => $userAlreadyExists->phone_number
            ],
            'status' => 200,
            'message' => 'Usuário Cadastrado com Sucesso!',
            'token' => $token
        ); 
    }
}
