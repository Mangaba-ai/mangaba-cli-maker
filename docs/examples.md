# 💡 Exemplos Práticos

## Visão Geral

Este guia apresenta exemplos práticos e casos de uso reais do Mangaba CLI, organizados por categoria e nível de complexidade.

## 🚀 Início Rápido

### Primeiro Uso

```bash
# 1. Configurar provider
mangaba config set provider openai
mangaba config set openai.apiKey "sua-api-key"

# 2. Testar conexão
mangaba test connection

# 3. Primeira tarefa
mangaba task "Olá! Explique como você pode me ajudar"

# 4. Analisar um arquivo
mangaba code package.json --analyze
```

### Comandos Essenciais

```bash
# Ver ajuda
mangaba --help

# Listar providers
mangaba providers

# Ver ferramentas disponíveis
mangaba tools

# Verificar configuração
mangaba config list
```

## 📝 Desenvolvimento de Software

### 1. Criação de API REST

#### Cenário: Criar uma API de usuários

```bash
# Passo 1: Planejar a arquitetura
mangaba task "Crie um plano detalhado para uma API REST de gerenciamento de usuários em Node.js com Express, incluindo autenticação JWT e validação"

# Passo 2: Gerar estrutura base
mangaba task "Crie a estrutura de pastas e arquivos principais para a API de usuários" --output project-structure.md

# Passo 3: Criar modelo de usuário
mangaba task "Crie um modelo de usuário com Mongoose incluindo validações, hash de senha e métodos de instância" --output models/User.js

# Passo 4: Criar controladores
mangaba task "Crie controladores para CRUD de usuários com tratamento de erros e validações" --output controllers/userController.js

# Passo 5: Criar rotas
mangaba task "Crie rotas Express para a API de usuários com middleware de autenticação" --output routes/users.js

# Passo 6: Gerar testes
mangaba code controllers/userController.js --test --output tests/userController.test.js
```

#### Resultado Esperado
```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    maxlength: [50, 'Nome deve ter no máximo 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Email inválido'
    }
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter no mínimo 6 caracteres']
  }
}, {
  timestamps: true
});

// Hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Método para verificar senha
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para gerar JWT
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

module.exports = mongoose.model('User', userSchema);
```

### 2. Refatoração de Código Legacy

#### Cenário: Modernizar código JavaScript antigo

```bash
# Analisar código atual
mangaba code legacy-app.js --analyze

# Identificar problemas específicos
mangaba task -f legacy-app.js "Identifique todos os problemas de código legacy neste arquivo e priorize as correções"

# Refatorar para ES6+
mangaba task -f legacy-app.js "Refatore este código para usar ES6+ features: arrow functions, destructuring, async/await, modules" --output modern-app.js

# Adicionar TypeScript
mangaba task -f modern-app.js "Converta este código JavaScript para TypeScript com tipagem completa" --output app.ts

# Gerar testes
mangaba code app.ts --test --output app.test.ts
```

#### Antes (Legacy)
```javascript
// legacy-app.js
var express = require('express');
var app = express();

function getUserById(id, callback) {
  // Simulação de busca no banco
  setTimeout(function() {
    if (id === '1') {
      callback(null, { id: '1', name: 'João' });
    } else {
      callback(new Error('Usuário não encontrado'));
    }
  }, 100);
}

app.get('/user/:id', function(req, res) {
  var id = req.params.id;
  getUserById(id, function(err, user) {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.json(user);
    }
  });
});
```

#### Depois (Moderno)
```typescript
// app.ts
import express, { Request, Response } from 'express';

interface User {
  id: string;
  name: string;
}

interface UserRepository {
  findById(id: string): Promise<User>;
}

class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map([
    ['1', { id: '1', name: 'João' }]
  ]);

  async findById(id: string): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }
}

class UserController {
  constructor(private userRepository: UserRepository) {}

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userRepository.findById(id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

const app = express();
const userRepository = new InMemoryUserRepository();
const userController = new UserController(userRepository);

app.get('/user/:id', (req, res) => userController.getUser(req, res));

export default app;
```

### 3. Geração de Testes Automatizados

#### Cenário: Criar suíte completa de testes

```bash
# Gerar testes unitários
mangaba code src/utils.js --test --output tests/utils.test.js

# Gerar testes de integração
mangaba task -f src/api.js "Crie testes de integração para esta API usando supertest" --output tests/integration/api.test.js

# Gerar testes E2E
mangaba task "Crie testes E2E com Playwright para o fluxo de login e dashboard" --output tests/e2e/auth.spec.js

# Configurar Jest
mangaba task "Crie configuração completa do Jest com coverage e setup" --output jest.config.js
```

#### Exemplo de Teste Gerado
```javascript
// tests/utils.test.js
const { formatDate, validateEmail, calculateAge } = require('../src/utils');

describe('Utils Functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date)).toBe('15/01/2024');
    });

    it('should handle invalid date', () => {
      expect(() => formatDate('invalid')).toThrow('Data inválida');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });

  describe('calculateAge', () => {
    it('should calculate age correctly', () => {
      const birthDate = new Date('1990-01-01');
      const age = calculateAge(birthDate);
      expect(age).toBeGreaterThan(30);
    });
  });
});
```

## 🔍 Análise e Debug

### 1. Análise de Performance

```bash
# Analisar performance geral
mangaba task -f app.js "Analise este código e identifique gargalos de performance, sugerindo otimizações específicas"

# Analisar queries de banco
mangaba task -f models/User.js "Analise as queries deste modelo e sugira otimizações de índices e consultas"

# Analisar bundle size
mangaba task -f webpack.config.js "Analise esta configuração e sugira otimizações para reduzir o tamanho do bundle"
```

### 2. Debug de Erros

```bash
# Analisar log de erro
mangaba task -f error.log "Analise este log de erro e identifique a causa raiz com sugestões de correção"

# Debug de código específico
mangaba task -f problematic-function.js "Este código está causando memory leak. Identifique o problema e sugira correção"

# Analisar stack trace
mangaba task "Analise este stack trace e explique o que está acontecendo: [colar stack trace]"
```

### 3. Code Review Automatizado

```bash
# Review completo
mangaba code src/ --analyze --report > code-review.md

# Review de PR
git diff main..feature-branch --name-only | xargs mangaba code --review

# Verificar padrões de código
mangaba task "Analise se este projeto segue as melhores práticas de Node.js e sugira melhorias"
```

## 🌐 Desenvolvimento Frontend

### 1. Componente React

```bash
# Criar componente funcional
mangaba task "Crie um componente React de formulário de login com validação, hooks e TypeScript" --output components/LoginForm.tsx

# Criar hook customizado
mangaba task "Crie um hook customizado para gerenciar estado de autenticação" --output hooks/useAuth.ts

# Gerar testes do componente
mangaba code components/LoginForm.tsx --test --output components/__tests__/LoginForm.test.tsx

# Criar stories do Storybook
mangaba task -f components/LoginForm.tsx "Crie stories do Storybook para este componente" --output components/LoginForm.stories.tsx
```

### 2. Aplicação Vue.js

```bash
# Criar componente Vue
mangaba task "Crie um componente Vue 3 de dashboard com Composition API e TypeScript" --output components/Dashboard.vue

# Criar store Pinia
mangaba task "Crie um store Pinia para gerenciar estado de usuários" --output stores/users.ts

# Configurar roteamento
mangaba task "Crie configuração de rotas Vue Router com guards de autenticação" --output router/index.ts
```

### 3. Aplicação Angular

```bash
# Criar serviço
mangaba task "Crie um serviço Angular para API de usuários com interceptors" --output services/user.service.ts

# Criar componente
mangaba task "Crie um componente Angular de lista de usuários com paginação" --output components/user-list.component.ts

# Criar guard
mangaba task "Crie um guard de autenticação para rotas protegidas" --output guards/auth.guard.ts
```

## 🗄️ Banco de Dados

### 1. Modelagem de Dados

```bash
# Criar schema Mongoose
mangaba task "Crie schemas Mongoose para um sistema de e-commerce: User, Product, Order, Category" --output models/

# Criar migrations Prisma
mangaba task "Crie migrations Prisma para o schema de e-commerce" --output prisma/migrations/

# Otimizar queries
mangaba task -f queries.sql "Otimize estas queries SQL para melhor performance" --output optimized-queries.sql
```

### 2. Seeders e Fixtures

```bash
# Criar seeders
mangaba task "Crie seeders para popular banco de dados de desenvolvimento com dados realistas" --output seeders/

# Criar fixtures de teste
mangaba task "Crie fixtures para testes com dados consistentes" --output tests/fixtures/
```

## 🚀 DevOps e Deploy

### 1. Docker e Containerização

```bash
# Criar Dockerfile
mangaba task "Crie Dockerfile otimizado para aplicação Node.js com multi-stage build" --output Dockerfile

# Criar docker-compose
mangaba task "Crie docker-compose.yml para desenvolvimento com Node.js, MongoDB e Redis" --output docker-compose.yml

# Criar .dockerignore
mangaba task "Crie .dockerignore otimizado para projeto Node.js" --output .dockerignore
```

### 2. CI/CD

```bash
# GitHub Actions
mangaba task "Crie workflow GitHub Actions para CI/CD com testes, build e deploy" --output .github/workflows/ci-cd.yml

# GitLab CI
mangaba task "Crie .gitlab-ci.yml para pipeline completo" --output .gitlab-ci.yml

# Scripts de deploy
mangaba task "Crie scripts de deploy para produção com rollback" --output scripts/deploy.sh
```

### 3. Monitoramento

```bash
# Configurar logging
mangaba task "Crie sistema de logging estruturado com Winston" --output utils/logger.js

# Métricas e health check
mangaba task "Crie endpoints de health check e métricas" --output routes/health.js

# Configurar APM
mangaba task "Configure New Relic APM para monitoramento" --output config/newrelic.js
```

## 📚 Documentação

### 1. README Completo

```bash
# Gerar README
mangaba task "Analise este projeto e crie um README.md completo com instalação, uso, exemplos e contribuição" --output README.md

# Documentação de API
mangaba task "Gere documentação OpenAPI/Swagger para esta API" --output docs/api.yml

# Guia de contribuição
mangaba task "Crie guia de contribuição detalhado" --output CONTRIBUTING.md
```

### 2. Documentação de Código

```bash
# JSDoc
mangaba code src/ --docs --format jsdoc

# TypeDoc
mangaba task "Gere documentação TypeDoc para este projeto TypeScript" --output docs/

# Comentários de código
mangaba code utils.js --explain --output utils-documented.js
```

## 🔧 Automação e Scripts

### 1. Scripts de Build

```bash
# Webpack config
mangaba task "Crie configuração Webpack otimizada para produção" --output webpack.config.js

# Rollup config
mangaba task "Crie configuração Rollup para biblioteca JavaScript" --output rollup.config.js

# Scripts npm
mangaba task "Crie scripts npm úteis para desenvolvimento e produção" --output package-scripts.json
```

### 2. Ferramentas de Desenvolvimento

```bash
# ESLint config
mangaba task "Crie configuração ESLint rigorosa para TypeScript" --output .eslintrc.js

# Prettier config
mangaba task "Crie configuração Prettier consistente" --output .prettierrc

# Husky hooks
mangaba task "Configure Husky com pre-commit hooks" --output .husky/
```

## 🎯 Casos de Uso Específicos

### 1. Migração de Tecnologia

```bash
# jQuery para React
mangaba task -f jquery-app.js "Converta esta aplicação jQuery para React com hooks" --output react-app.jsx

# JavaScript para TypeScript
mangaba task -f app.js "Migre este código JavaScript para TypeScript com tipagem completa" --output app.ts

# REST para GraphQL
mangaba task -f rest-api.js "Converta esta API REST para GraphQL" --output graphql-api.js
```

### 2. Otimização de Performance

```bash
# Otimizar React
mangaba task -f Component.jsx "Otimize este componente React para performance" --output OptimizedComponent.jsx

# Otimizar SQL
mangaba task -f slow-queries.sql "Otimize estas queries SQL lentas" --output fast-queries.sql

# Otimizar bundle
mangaba task "Analise e otimize o bundle size desta aplicação"
```

### 3. Segurança

```bash
# Audit de segurança
mangaba task "Faça auditoria de segurança deste código e identifique vulnerabilidades"

# Implementar autenticação
mangaba task "Implemente autenticação segura com JWT e refresh tokens" --output auth/

# Sanitização de dados
mangaba task -f user-input.js "Adicione sanitização e validação segura" --output secure-input.js
```

## 📊 Relatórios e Análises

### 1. Relatório de Qualidade

```bash
# Análise completa
mangaba task "Gere relatório completo de qualidade de código para este projeto" --output quality-report.md

# Métricas de complexidade
mangaba code src/ --analyze --metrics > complexity-report.json

# Cobertura de testes
mangaba task "Analise cobertura de testes e sugira melhorias" --output coverage-analysis.md
```

### 2. Documentação Técnica

```bash
# Arquitetura do sistema
mangaba task "Documente a arquitetura deste sistema" --output docs/architecture.md

# Fluxo de dados
mangaba task "Crie diagrama de fluxo de dados" --output docs/data-flow.md

# Decisões técnicas
mangaba task "Documente decisões técnicas importantes" --output docs/adr/
```

## 🔄 Workflows Avançados

### 1. Pipeline de Desenvolvimento

```bash
#!/bin/bash
# dev-pipeline.sh

echo "🚀 Iniciando pipeline de desenvolvimento..."

# Análise de código
mangaba code . --analyze --report > reports/code-analysis.md

# Gerar testes faltantes
find src -name "*.js" -not -path "*/tests/*" | while read file; do
  if [ ! -f "tests/$(basename $file .js).test.js" ]; then
    mangaba code "$file" --test --output "tests/$(basename $file .js).test.js"
  fi
done

# Atualizar documentação
mangaba task "Atualize README.md com mudanças recentes" --output README.md

# Verificar segurança
mangaba task "Faça auditoria de segurança" --output reports/security-audit.md

echo "✅ Pipeline concluído!"
```

### 2. Code Review Automatizado

```bash
#!/bin/bash
# auto-review.sh

# Arquivos modificados no PR
FILES=$(git diff --name-only origin/main...HEAD)

echo "📝 Iniciando code review automatizado..."

for file in $FILES; do
  echo "Analisando $file..."
  mangaba code "$file" --review >> review-comments.md
done

# Análise geral do PR
mangaba task "Analise as mudanças deste PR e forneça feedback" --output pr-analysis.md

echo "✅ Review concluído! Verifique review-comments.md"
```

---

**🎯 Dicas para Máxima Eficiência:**

1. **Use contexto**: Sempre adicione contexto relevante antes de tarefas complexas
2. **Combine comandos**: Use pipes e scripts para automatizar workflows
3. **Salve outputs**: Use `--output` para salvar resultados importantes
4. **Itere rapidamente**: Faça pequenas mudanças e teste frequentemente
5. **Documente processos**: Crie scripts reutilizáveis para tarefas comuns

**📚 Próximos Passos:**
- [Referência da API](api-reference.md)
- [Guia de Contribuição](contributing.md)
- [FAQ](faq.md)