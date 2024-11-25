# projeto - integrador

## 1 - Baixe o repositório do Projeto 
```
git clone https://github.com/ElienaiTavares/projeto---integrador.git
```
## 2 - API
dentro do Repositporio api:
- Crie o Arquivo .env (copiar o arquivo .env_example)
- Configure as Variáveis de conexão com o Banco
```
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```
Execute os Comandos:
```
composer install
php artisan migrate --seed
php artisan serve --host=0.0.0.0 --port=8000
```

## 3 - APP 
dentrodo Repositório app-saude: 
- Execute os Comandos:
```
npm install
npx expo start
```
- Aperte a tecla W para rodar o Sistema do Novegador
