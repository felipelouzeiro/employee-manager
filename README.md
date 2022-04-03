Bem vindo a Employee Manager, API REST desenvolvida para gerenciar informações e relatórios dos funcionários de uma empresa.

## Banco de dados:
  - mysql2: ^2.3.3

## Ferramentas de produção:
  - dotenv: ^16.0.0
  - express: ^4.17.3
  - jsonwebtoken: ^8.5.1
  - sequelize: ^6.17.0
  - yup: ^0.32.11

## Testes de Integração:
  - jest: ^27.5.1
  - supertest: ^6.2.2

## Para testar em seu ambiente:

- Clone e acesse o diretório do projeto, em seguida instale as dependecias com o comando `npm install`.
- No diretório você encontra um arquivo chamado '.env.example' que contém variaveis que devem ser preenchidas com seus dados, como o user e password do seu banco de dados pessoal.
Lembre-se de renomear o arquivo para '.env'!

- Crie um banco de dados com o nome 'employee_manager' utilizando a ferramenta de gerenciamento de banco de dados que você tem. Você pode criar o banco por meio da execução da query `CREATE DATABASE employee_manager DEFAULT CHARACTER SET = 'utf8mb4';` por exemplo.

- Em seguida execute o servidor com o comando `npm start` e pronto, já é possível testar a aplicação e seus endpoints.

## Endpoints
- A maioria dos endpoints necessitam do envio de informações no body da requisição em formato JSON como também o envio do token pelo campo 'authorization' na header da requisição;
- O retorno das requisições também são em formato JSON, inclusive os avisos gerados pelo tratamento de erros da API;
- Abaixo tem exemplos dos formatos de requisição esperados pela API, considere a alteração do formato caso queira testar o tratamento de erros.

### API employees CRUD:

- POST: /employees/
#### Cria novo cadastro. Deverá retornar o status 201 com um token no body da resposta.

```json
{
"name": "Luke Skywalker",
"email": "catemail@email.com.br",
"department": "DevOps",
"salary": "6797.00",
"birth_date": "01-01-1983",
"password": "senhaDificil123"
}
```
- POST /employees/login/
#### Faz login com dados cadastrados. Deverá retornar o status 200 e um token no body da resposta.

- GET: /employees/
#### Retorna todos os cadastros. Deverá retornar o status 200 e os employees cadastrados no body da resposta. *Envio de token necessário.*

- GET /employees/ID/
#### Procura cadastro específico. Deverá retornar o status 200 e o employee cadastrado no body da resposta. *Envio de token necessário.*

- UPDATE /employees/ID/
#### Atualiza cadastro. Deverá retornar o status 200. *Envio de token necessário.*

``` json
{
"name": "Coragem Covarde",
"email": "murimuriel@gbox.com.br",
"department": "Laboral",
"salary": "6797.00",
"birth_date": "01-01-1983",
"password": "ibiarapinhamonhangaba"
}
```

- DELETE /employees/ID/
#### Deleta cadastro. Deverá retornar o status 200. *Envio de token necessário.*


### API employees reports:

- GET /reports/employees/salary/
#### Lista cadastro com menor e maior salário e a média dos salários de todos os cadastros. Deverá retornar o status 200. *Envio de token necessário.*


- GET /reports/employees/age/
#### *Is coming.*


## Testes de integração:
- Para executar os testes, rode o comando `npm run test` no terminal.