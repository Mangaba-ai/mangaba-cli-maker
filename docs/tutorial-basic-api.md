# Tutorial: Criando uma API REST Básica com Mangaba CLI

**Objetivo:** Neste tutorial, vamos guiar você passo a passo na utilização do Mangaba CLI para planejar, criar e testar uma API REST "To-Do" simples do zero.

**O que você vai aprender:**
- Como usar `mangaba task` para gerar código e planos.
- Como usar `mangaba code` para gerar testes.
- Como acelerar seu workflow de desenvolvimento com o Mangaba CLI.

---

## 🚀 Pré-requisitos

Antes de começar, certifique-se de que você tem:

1.  **Node.js e npm:** Verifique com `node --version` e `npm --version`.
2.  **Mangaba CLI instalado:** Instale com `npm install -g mangaba-cli`.
3.  **Provider Padrão Configurado:** Configure sua API key com `mangaba config set provider <seu-provider>` e `mangaba config set <seu-provider>.apiKey "..."`.

---

## 🛠️ Passo 1: Setup do Projeto

Primeiro, vamos criar um novo diretório para nosso projeto e inicializar um projeto Node.js.

```bash
# Criar um novo diretório
mkdir mangaba-todo-api
cd mangaba-todo-api

# Inicializar um projeto Node.js
npm init -y
```

Agora estamos prontos para construir nossa API!

---

## 🧠 Passo 2: Planejando a API

Antes de escrever qualquer código, vamos usar o Mangaba para planejar a estrutura da nossa API.

Execute `mangaba task` para pedir a ele que crie um plano.

```bash
mangaba task "Crie um plano para uma API To-Do simples usando Express e Node.js. Os dados devem ser armazenados em um array em memória. Inclua endpoints para CRUD (Create, Read, Update, Delete)." --output "PLAN.md"
```

O Mangaba irá gerar um arquivo `PLAN.md` com algo parecido com isto:

> #### Plano da API: Simple To-Do API
>
> 1.  **Estrutura do Projeto:**
>     - `index.js`: Arquivo principal do servidor.
>     - `package.json`: Dependências do projeto.
>
> 2.  **Modelo de Dados:**
>     - Um item "To-Do" terá o formato: `{ id: number, task: string, completed: boolean }`.
>     - Os dados serão armazenados em um simples array JavaScript no `index.js`.
>
> 3.  **Endpoints:**
>     - `GET /todos`: Obter todos os to-dos.
>     - `GET /todos/:id`: Obter um único to-do.
>     - `POST /todos`: Criar um novo to-do.
>     - `PUT /todos/:id`: Atualizar um to-do.
>     - `DELETE /todos/:id`: Deletar um to-do.
>
> 4.  **Dependências:**
>     - `express`: Web framework.
>     - `jest` e `supertest`: Para testes (dependências de desenvolvimento).

---

## ✍️ Passo 3: Gerando o Servidor e as Rotas

Com o plano em mãos, podemos pedir ao Mangaba para gerar o código. Vamos criar um único arquivo `index.js` que conterá a configuração do servidor Express e todos os manipuladores de rota.

```bash
mangaba task "Com base no plano em PLAN.md, gere o código para um servidor Node.js Express. Inclua toda a lógica em um único arquivo index.js." --output "index.js"
```

O Mangaba irá gerar o arquivo `index.js` com o seguinte conteúdo:

```javascript
// index.js

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Banco de dados em memória
let todos = [
  { id: 1, task: 'Aprender Mangaba CLI', completed: false },
  { id: 2, task: 'Construir uma API robusta', completed: false },
];

// GET: Obter todos os to-dos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET: Obter to-do por ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('To-do não encontrado.');
  res.json(todo);
});

// POST: Criar novo to-do
app.post('/todos', (req, res) => {
  if (!req.body.task) {
    return res.status(400).send('A descrição da tarefa é obrigatória.');
  }
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    task: req.body.task,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT: Atualizar um to-do
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('To-do não encontrado.');

  if (req.body.task) todo.task = req.body.task;
  if (typeof req.body.completed === 'boolean') todo.completed = req.body.completed;

  res.json(todo);
});

// DELETE: Deletar um to-do
app.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) return res.status(404).send('To-do não encontrado.');

  todos.splice(todoIndex, 1);
  res.status(204).send();
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`API To-Do rodando em http://localhost:${port}`);
  });
}

module.exports = app; // Exportar para testes
```

---

## ✅ Passo 4: Gerando os Testes

Uma API robusta precisa de testes. Vamos pedir ao Mangaba para gerar testes para nossa API usando `jest` e `supertest`.

```bash
mangaba code "index.js" --test --output "index.test.js"
```

O Mangaba irá gerar o arquivo `index.test.js` com o seguinte conteúdo:

```javascript
// index.test.js

const request = require('supertest');
const app = require('./index');

describe('To-Do API', () => {
  it('GET /todos - deve obter todos os to-dos', async () => {
    const response = await request(app).get('/todos');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('POST /todos - deve criar um novo to-do', async () => {
    const newTask = { task: 'Escrever testes' };
    const response = await request(app)
      .post('/todos')
      .send(newTask);
    expect(response.statusCode).toBe(201);
    expect(response.body.task).toBe(newTask.task);
  });

  it('PUT /todos/:id - deve atualizar um to-do', async () => {
    const updatedTask = { task: 'Tarefa atualizada', completed: true };
    const response = await request(app)
      .put('/todos/1')
      .send(updatedTask);
    expect(response.statusCode).toBe(200);
    expect(response.body.task).toBe(updatedTask.task);
    expect(response.body.completed).toBe(true);
  });

  it('DELETE /todos/:id - deve deletar um to-do', async () => {
    const response = await request(app).delete('/todos/2');
    expect(response.statusCode).toBe(204);
  });
});
```

---

## 🏁 Passo 5: Rodando e Testando a API

Tudo pronto! Vamos instalar as dependências, rodar o servidor e executar os testes.

```bash
# 1. Instalar dependências
npm install express
npm install jest supertest --save-dev

# 2. Adicionar script de teste ao package.json
# Adicione a seguinte linha na seção "scripts":
# "test": "jest"

# 3. Rodar o servidor (em um novo terminal)
node index.js

# 4. Rodar os testes (no terminal original)
npm test
```

Você verá todos os testes passando! Agora você tem uma API CRUD completa rodando em `http://localhost:3000/todos`.

---

## 🎉 Conclusão

Parabéns! Você planejou, gerou e testou uma API com sucesso em questão de minutos usando o Mangaba CLI.

Este tutorial demonstra como o Mangaba pode acelerar drasticamente seu fluxo de trabalho de desenvolvimento.

### Próximos Passos

- Explore os **[Exemplos Práticos](examples.md)** para casos de uso mais complexos.
- Confira a **[Referência da API](api-reference.md)** para aprender sobre todos os comandos e opções.
- Tente usar o Mangaba em um de seus projetos existentes para refatorar código, gerar documentação e muito mais!
