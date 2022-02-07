# glossolalia

backend: [glossolalia-backend.herokuapp.com](https://glossolalia-backend.herokuapp.com)

frontend: [glossolalia-frontend.herokuapp.com](https://glossolalia-frontend.herokuapp.com)

## O quê?

Este é o meu projeto para o último trabalho da disciplina de Paradigmas de Programação e tem como objetivo criar uma página para visualizar o relacionamento entre linguagens de programação. O usuário poderá informar o critério de relacão e o programa deverá renderizar uma ilustração no formato de grafo, relacionando, quando possível, as linguagens de programação existentes no banco de dados.

### QUÊ??

Assim, digamos que o banco de dados contenha 10 linguagens de programação, cada uma com informações relevantes sobre si. Uma dessas informações pode ser quais as linguagens que essa linguagem influenciou ao longo do tempo. Convenhamos que é meio sem graça visualizar essa informação em um formato comum de texto/lista, né?! Então, o objetivo é criar um meio de visualizá-la através de um grafo! Bem mais divertido, concorda?! Então você, como usuário, diz que quer visualizar as linguagens com base nas suas influências. O programa gera uma visualização em forma de grafo com base nesse seu input.

## Como?

Para isso, o projeto irá consistir de duas partes:

### backend

Para persistir os dados necessários sobre as linguagens de programação, será utilizada a plataforma [Supabase](https://supabase.com/). Nela, será criado um banco de dados `programming_languages` com as tabelas `programming_language` (representando linguagens de programação) e `keyword` (representando palavras-chave de uma linguagem de programação).

A tabela abaixo ilustra as colunas que cada tabela irá possuir:

| programming_language   | keyword                   |
|------------------------|---------------------------|
| `id`                   | `id`                      |
| `name`                 | `programming_language_id` |
| `first_appeared`       | `keyword`                 |
| `paradigm`             |                           |
| `designed_by`          |                           |
| `typing_discipline`    |                           |
| `influenced_by`        |                           |
| `influenced`           |                           |
| `website_url`          |                           |
| `source_url`           |                           |
| `filename_extension`   |                           |

Com o banco de dados suficientemente "alimentado", será construída uma API utilizando [TypeScript](https://www.typescriptlang.org/), [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/) e [TypeORM](https://typeorm.io/) para acessar esses dados.

### frontend

Para a interface, será utilizada alguma biblioteca JavaScript para visualização gráfica (talvez [vis.js](https://visjs.org/)), consumindo os dados através da API.

## Requisitos mínimos

- O banco de dados deve ter de 25 a 50 linguagens de programação ao final do trabalho, com keywords o suficiente para gerar uma visualização boa.

- A API deve ter seus endpoints documentados, para futuros usuários.

## Requisitos não-funcionais

- A API será hospedada na plataforma [Heroku](https://www.heroku.com/), ou seja, qualquer pessoa com acesso à internet poderá consumir os dados do banco de dados.

- Por enquanto, a página web irá rodar de forma local.

- Todo o código desenvolvido será publicado no repositório do GitHub, com a listagem dos comandos necessários para rodar o projeto sem qualquer problema.
