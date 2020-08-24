<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Desafio 06: Banco de dados e upload de arquivos no Node.js
</h3>

<p align="center">“Só deseje as coisas as quais você está disposto a lutar”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/leandroppf/gostack-desafio-conceitos-react-native?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Leandro Pedroso" src="https://img.shields.io/badge/made%20by-Leandroppf-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/leandroppf/gostack-desafio-typeorm-upload/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/leandroppf/gostack-desafio-typeorm-upload?style=social">
  </a>
</p>

## :rocket: Sobre o desafio

Nesse desafio, o objetivo era continuar desenvolvendo a aplicação de gestão de transações, treinando o que aprendi até agora no Node.js junto ao TypeScript, utilizando o conceito de models, repositories e services, mas dessa vez incluindo o uso de banco de dados com o TypeORM e envio de arquivos com o Multer!

Essa será uma aplicação que deve armazenar transações financeiras de entrada e saída e permitir o cadastro e a listagem dessas transações, além de permitir a criação de novos registros no banco de dados a partir do envio de um arquivo csv.

### Rotas da aplicação

Para esse desafio eu recebi um template de exemplo com rotas pré definidas, porém sem código de execução, meu objetivo era desenvolver o código para atingir os objetivos de cada rota, utilizando o conceito de models, repositories e services!

- **`POST /transactions`**: A rota deve receber `title`, `value`, `type`, e `category` dentro do corpo da requisição, sendo o `type` o tipo da transação, que deve ser `income` para entradas (depósitos) e `outcome` para saídas (retiradas). Ao cadastrar uma nova transação, ela deve ser armazenada dentro do seu banco de dados, possuindo os campos `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`. A rota deve retornar um objeto com o seguinte formato:

```json
{
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "income"
}
```

- **`GET /transactions`**: Essa rota deve retornar uma listagem com todas as transações que você cadastrou até agora, junto com o valor da soma de entradas, retiradas e total de crédito. Essa rota deve retornar um objeto com o seguinte formato:

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salário",
      "value": 4000,
      "type": "income"
    },
    {
      "id": "uuid",
      "title": "Freela",
      "value": 2000,
      "type": "income"
    },
    {
      "id": "uuid",
      "title": "Pagamento da fatura",
      "value": 4000,
      "type": "outcome"
    },
    {
      "id": "uuid",
      "title": "Cadeira Gamer",
      "value": 1200,
      "type": "outcome"
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```

- **`DELETE /transactions/:id`**: A rota deve deletar uma transação com o `id` presente nos parâmetros da rota;

* **`POST /transactions/import`**: A rota deve permitir a importação de um arquivo com formato `.csv` contendo as mesmas informações necessárias para criação de uma transação `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`, onde cada linha do arquivo CSV deve ser um novo registro para o banco de dados, e por fim retorne todas as `transactions` que foram importadas para seu banco de dados.

### Especificação dos testes

O template também possui testes automatizados e um dos objetivos é que o código criado passe em todos os testes listados abaixo:

<h4 align="center">
  ⚠️ Antes de rodar os testes, foi necessário criar um banco de dados com o nome "gostack_desafio06_tests" para que todos os testes pudessem executar corretamente ⚠️
</h4>

- **`should be able to create a new transaction`**: Para que esse teste passe, sua aplicação deve permitir que uma transação seja criada, e retorne um json com a transação criado.

* **`should create tags when inserting new transactions`**: Para que esse teste passe, sua aplicação deve permitir que ao criar uma nova transação com uma categoria que não existe, essa seja criada e inserida no campo category_id da transação com o `id` que acabou de ser criado.

- **`should not create tags when they already exists`**: Para que esse teste passe, sua aplicação deve permitir que ao criar uma nova transação com uma categoria que já existe, seja atribuído ao campo category_id da transação com o `id` dessa categoria existente, não permitindo a criação de categorias com o mesmo `title`.

* **`should be able to list the transactions`**: Para que esse teste passe, sua aplicação deve permitir que seja retornado um array de objetos contendo todas as transações junto ao balanço de income, outcome e total das transações que foram criadas até o momento.

- **`should not be able to create outcome transaction without a valid balance`**: Para que esse teste passe, sua aplicação não deve permitir que uma transação do tipo `outcome` extrapole o valor total que o usuário tem em caixa (total de income), retornando uma resposta com código HTTP 400 e uma mensagem de erro no seguinte formato: `{ error: string }`.

* **`should be able to delete a transaction`**: Para que esse teste passe, você deve permitir que a sua rota de delete exclua uma transação, e ao fazer a exclusão, ele retorne uma resposta vazia, com status 204.

- **`should be able to import transactions`**: Para que esse teste passe, sua aplicação deve permitir que seja importado um arquivo csv, contendo o seguinte [modelo](./assets/file.csv). Com o arquivo importado, você deve permitir que seja criado no banco de dados todos os registros e categorias que estavam presentes nesse arquivo, e retornar todas as transactions que foram importadas.

---

Desafio concluído no dia 21/04/2020 por Leandro Pinto Pedroso Filho
