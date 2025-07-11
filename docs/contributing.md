# 🤝 Guia de Contribuição

## Bem-vindo!

Obrigado por considerar contribuir com o Mangaba CLI! Este guia fornece todas as informações necessárias para contribuir efetivamente com o projeto.

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Padrões de Código](#padrões-de-código)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Testes](#testes)
- [Documentação](#documentação)
- [Pull Requests](#pull-requests)
- [Issues](#issues)
- [Comunidade](#comunidade)

## 🚀 Como Contribuir

### Tipos de Contribuição

1. **🐛 Correção de Bugs**
   - Reportar bugs encontrados
   - Corrigir bugs existentes
   - Melhorar tratamento de erros

2. **✨ Novas Funcionalidades**
   - Implementar novos comandos
   - Adicionar novos providers de IA
   - Melhorar funcionalidades existentes

3. **📚 Documentação**
   - Melhorar documentação existente
   - Criar novos guias e tutoriais
   - Traduzir documentação

4. **🧪 Testes**
   - Escrever novos testes
   - Melhorar cobertura de testes
   - Testes de integração

5. **🎨 UX/UI**
   - Melhorar interface da CLI
   - Otimizar experiência do usuário
   - Feedback e mensagens de erro

6. **⚡ Performance**
   - Otimizações de performance
   - Redução de uso de memória
   - Melhoria de velocidade

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- **Node.js**: 16.0.0 ou superior
- **npm**: 7.0.0 ou superior
- **Git**: Última versão
- **Editor**: VS Code recomendado

### Setup Inicial

```bash
# 1. Fork o repositório no GitHub
# 2. Clone seu fork
git clone https://github.com/seu-usuario/mangaba-cli.git
cd mangaba-cli

# 3. Adicione o repositório original como upstream
git remote add upstream https://github.com/original/mangaba-cli.git

# 4. Instale dependências
npm install

# 5. Configure o ambiente de desenvolvimento
cp .env.example .env.development

# 6. Execute testes para verificar setup
npm test

# 7. Execute o CLI localmente
npm run dev
```

### Configuração do Editor

#### VS Code (Recomendado)

Instale as extensões recomendadas:

```json
// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-json",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.test-adapter-converter"
  ]
}
```

Configurações do workspace:

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "typescript"],
  "prettier.requireConfig": true,
  "files.exclude": {
    "node_modules": true,
    "dist": true,
    "coverage": true
  }
}
```

## 🏗️ Estrutura do Projeto

```
mangaba-cli/
├── src/                    # Código fonte principal
│   ├── agent.js           # Classe principal do agente IA
│   ├── banner.js          # Banner e mensagens de boas-vindas
│   ├── cli.js             # Interface da linha de comando
│   ├── config.js          # Gerenciamento de configurações
│   ├── context.js         # Gerenciamento de contexto
│   ├── providers/         # Providers de IA
│   │   ├── openai.js
│   │   ├── gemini.js
│   │   ├── anthropic.js
│   │   ├── ollama.js
│   │   ├── huggingface.js
│   │   ├── cohere.js
│   │   ├── together.js
│   │   ├── localai.js
│   │   └── groq.js
│   └── tools/             # Ferramentas auxiliares
│       ├── fileSearcher.js
│       └── webSearcher.js
├── tests/                 # Testes automatizados
│   ├── unit/             # Testes unitários
│   ├── integration/      # Testes de integração
│   └── e2e/              # Testes end-to-end
├── docs/                 # Documentação
│   ├── installation.md
│   ├── configuration.md
│   ├── usage.md
│   ├── examples.md
│   ├── api-reference.md
│   └── contributing.md
├── examples/             # Exemplos de uso
├── scripts/              # Scripts de build e deploy
├── .github/              # Templates e workflows GitHub
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── package.json
├── README.md
└── CHANGELOG.md
```

### Arquitetura

#### Componentes Principais

1. **AIAgent** (`src/agent.js`)
   - Classe principal que coordena todas as operações
   - Gerencia providers de IA
   - Executa tarefas e comandos

2. **Providers** (`src/providers/`)
   - Implementações específicas para cada provider de IA
   - Interface comum para todos os providers
   - Tratamento de erros e rate limiting

3. **ConfigManager** (`src/config.js`)
   - Gerenciamento de configurações globais e locais
   - Validação de configurações
   - Backup e restauração

4. **CLI** (`src/cli.js`)
   - Interface da linha de comando
   - Parsing de argumentos
   - Roteamento de comandos

#### Fluxo de Dados

```
CLI Input → Command Parser → AIAgent → Provider → AI Service → Response → Output
```

## 📝 Padrões de Código

### Estilo de Código

Usamos **ESLint** e **Prettier** para manter consistência:

```javascript
// ✅ Bom
class ExampleProvider {
  constructor(config) {
    this.config = config;
    this.client = null;
  }

  async generateResponse(prompt, options = {}) {
    try {
      const response = await this.client.chat({
        messages: [{ role: 'user', content: prompt }],
        ...options
      });
      return response.choices[0].message.content;
    } catch (error) {
      throw new Error(`Provider error: ${error.message}`);
    }
  }
}

// ❌ Ruim
class exampleProvider{
    constructor(config){
        this.config=config
        this.client=null
    }
    async generateResponse(prompt,options){
        const response=await this.client.chat({messages:[{role:'user',content:prompt}],...options})
        return response.choices[0].message.content
    }
}
```

### Convenções de Nomenclatura

- **Classes**: PascalCase (`AIAgent`, `ConfigManager`)
- **Funções/Métodos**: camelCase (`generateResponse`, `validateConfig`)
- **Constantes**: UPPER_SNAKE_CASE (`DEFAULT_TIMEOUT`, `API_BASE_URL`)
- **Arquivos**: kebab-case (`file-searcher.js`, `web-searcher.js`)
- **Variáveis**: camelCase (`apiKey`, `baseUrl`)

### Estrutura de Classes

```javascript
class ProviderTemplate {
  constructor(config) {
    this.validateConfig(config);
    this.config = config;
    this.client = this.initializeClient();
  }

  // Métodos públicos primeiro
  async generateResponse(prompt, options = {}) {
    // Implementação
  }

  async listModels() {
    // Implementação
  }

  // Métodos privados depois
  validateConfig(config) {
    // Validação
  }

  initializeClient() {
    // Inicialização
  }

  // Getters e setters por último
  get isConfigured() {
    return Boolean(this.config.apiKey);
  }
}
```

### Tratamento de Erros

```javascript
// ✅ Bom - Erros específicos e informativos
class CustomError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
  }
}

async function apiCall() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new CustomError(
        `API request failed: ${response.statusText}`,
        'API_ERROR',
        { status: response.status, url }
      );
    }
    return await response.json();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      `Network error: ${error.message}`,
      'NETWORK_ERROR',
      { originalError: error }
    );
  }
}
```

### Documentação JSDoc

```javascript
/**
 * Gera resposta usando provider de IA
 * @param {string} prompt - Prompt para o modelo
 * @param {Object} options - Opções adicionais
 * @param {string} [options.model] - Modelo específico a usar
 * @param {number} [options.maxTokens=2048] - Máximo de tokens
 * @param {number} [options.temperature=0.7] - Temperatura do modelo
 * @returns {Promise<string>} Resposta gerada
 * @throws {Error} Quando a API falha ou configuração é inválida
 * @example
 * const response = await provider.generateResponse('Olá!', {
 *   model: 'gpt-4',
 *   maxTokens: 100
 * });
 */
async generateResponse(prompt, options = {}) {
  // Implementação
}
```

## 🔄 Processo de Desenvolvimento

### Workflow Git

1. **Sincronizar com upstream**
```bash
git checkout main
git pull upstream main
git push origin main
```

2. **Criar branch para feature/fix**
```bash
# Para nova feature
git checkout -b feature/nome-da-feature

# Para correção de bug
git checkout -b fix/nome-do-bug

# Para documentação
git checkout -b docs/nome-da-doc
```

3. **Fazer commits semânticos**
```bash
# Tipos de commit
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas de manutenção

# Exemplos
git commit -m "feat: adicionar provider Cohere"
git commit -m "fix: corrigir erro de timeout no OpenAI"
git commit -m "docs: atualizar guia de instalação"
```

4. **Push e Pull Request**
```bash
git push origin feature/nome-da-feature
# Criar PR no GitHub
```

### Convenções de Commit

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

#### Exemplos:

```bash
# Feature simples
feat: adicionar comando de busca web

# Fix com detalhes
fix(providers): corrigir timeout no provider OpenAI

O timeout estava muito baixo causando falhas em prompts longos.
Aumentado de 10s para 30s e adicionado retry automático.

Fixes #123

# Breaking change
feat!: alterar estrutura de configuração

BREAKING CHANGE: configurações agora usam estrutura aninhada
```

### Versionamento

Usamos [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): Novas features compatíveis
- **PATCH** (0.0.1): Bug fixes compatíveis

## 🧪 Testes

### Estrutura de Testes

```
tests/
├── unit/                  # Testes unitários
│   ├── providers/
│   ├── config.test.js
│   └── agent.test.js
├── integration/           # Testes de integração
│   ├── cli.test.js
│   └── providers.test.js
├── e2e/                   # Testes end-to-end
│   └── full-workflow.test.js
├── fixtures/              # Dados de teste
└── helpers/               # Utilitários de teste
```

### Executando Testes

```bash
# Todos os testes
npm test

# Testes unitários
npm run test:unit

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e

# Com coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Teste específico
npm test -- --grep "OpenAI provider"
```

### Escrevendo Testes

#### Teste Unitário

```javascript
// tests/unit/providers/openai.test.js
const { expect } = require('chai');
const sinon = require('sinon');
const OpenAIProvider = require('../../../src/providers/openai');

describe('OpenAIProvider', () => {
  let provider;
  let mockConfig;

  beforeEach(() => {
    mockConfig = {
      apiKey: 'test-key',
      model: 'gpt-4',
      baseUrl: 'https://api.openai.com/v1'
    };
    provider = new OpenAIProvider(mockConfig);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('constructor', () => {
    it('should initialize with valid config', () => {
      expect(provider.config).to.deep.equal(mockConfig);
      expect(provider.isConfigured).to.be.true;
    });

    it('should throw error with invalid config', () => {
      expect(() => new OpenAIProvider({})).to.throw('API key is required');
    });
  });

  describe('generateResponse', () => {
    it('should generate response successfully', async () => {
      const mockResponse = { choices: [{ message: { content: 'Test response' } }] };
      sinon.stub(provider.client, 'chat').resolves(mockResponse);

      const result = await provider.generateResponse('Test prompt');
      expect(result).to.equal('Test response');
    });

    it('should handle API errors', async () => {
      sinon.stub(provider.client, 'chat').rejects(new Error('API Error'));

      await expect(provider.generateResponse('Test'))
        .to.be.rejectedWith('API Error');
    });
  });
});
```

#### Teste de Integração

```javascript
// tests/integration/cli.test.js
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

describe('CLI Integration', () => {
  it('should show help', async () => {
    const { stdout } = await execAsync('node src/cli.js --help');
    expect(stdout).to.include('Usage:');
    expect(stdout).to.include('Commands:');
  });

  it('should list providers', async () => {
    const { stdout } = await execAsync('node src/cli.js providers');
    expect(stdout).to.include('OpenAI');
    expect(stdout).to.include('Gemini');
  });

  it('should handle invalid commands', async () => {
    try {
      await execAsync('node src/cli.js invalid-command');
    } catch (error) {
      expect(error.stderr).to.include('Unknown command');
    }
  });
});
```

### Cobertura de Testes

Mantemos cobertura mínima de:
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

```bash
# Verificar cobertura
npm run test:coverage

# Gerar relatório HTML
npm run coverage:html
```

## 📚 Documentação

### Tipos de Documentação

1. **README.md**: Visão geral e quick start
2. **docs/**: Documentação detalhada
3. **JSDoc**: Documentação de código
4. **CHANGELOG.md**: Histórico de mudanças
5. **Exemplos**: Casos de uso práticos

### Escrevendo Documentação

#### Estrutura de Documento

```markdown
# Título Principal

## Visão Geral
Descrição breve e objetiva.

## Índice
- [Seção 1](#seção-1)
- [Seção 2](#seção-2)

## Seção 1

### Subseção
Conteúdo com exemplos práticos.

```bash
# Exemplo de código
comando --opcao valor
```

#### Resultado esperado
```
Saída do comando
```

## Próximos Passos
- [Link relacionado](outro-doc.md)
```

#### Boas Práticas

- **Seja claro e conciso**
- **Use exemplos práticos**
- **Mantenha atualizado**
- **Inclua screenshots quando necessário**
- **Links para documentação relacionada**

### Atualizando Documentação

```bash
# Verificar links quebrados
npm run docs:check-links

# Gerar documentação da API
npm run docs:generate

# Servir documentação localmente
npm run docs:serve
```

## 🔀 Pull Requests

### Checklist do PR

Antes de submeter um PR, verifique:

- [ ] **Código**
  - [ ] Segue padrões de código
  - [ ] Inclui testes adequados
  - [ ] Passa em todos os testes
  - [ ] Não quebra funcionalidades existentes

- [ ] **Documentação**
  - [ ] Atualiza documentação relevante
  - [ ] Inclui JSDoc quando necessário
  - [ ] Atualiza CHANGELOG.md

- [ ] **Commits**
  - [ ] Commits semânticos
  - [ ] Mensagens descritivas
  - [ ] Squash de commits quando apropriado

- [ ] **PR**
  - [ ] Título descritivo
  - [ ] Descrição detalhada
  - [ ] Links para issues relacionadas
  - [ ] Screenshots se aplicável

### Template de PR

```markdown
## Descrição
Descrição clara e concisa das mudanças.

## Tipo de Mudança
- [ ] Bug fix (mudança que corrige um problema)
- [ ] Nova feature (mudança que adiciona funcionalidade)
- [ ] Breaking change (mudança que quebra compatibilidade)
- [ ] Documentação
- [ ] Refatoração
- [ ] Testes

## Como Testar
1. Passo 1
2. Passo 2
3. Resultado esperado

## Screenshots
(Se aplicável)

## Checklist
- [ ] Meu código segue os padrões do projeto
- [ ] Fiz self-review do código
- [ ] Comentei código complexo
- [ ] Atualizei documentação
- [ ] Adicionei testes
- [ ] Todos os testes passam
- [ ] Não há conflitos de merge

## Issues Relacionadas
Fixes #123
Related to #456
```

### Processo de Review

1. **Automated Checks**
   - CI/CD pipeline
   - Testes automatizados
   - Linting e formatação
   - Verificação de segurança

2. **Code Review**
   - Pelo menos 1 aprovação
   - Review de maintainer para breaking changes
   - Feedback construtivo

3. **Merge**
   - Squash and merge para features
   - Merge commit para releases
   - Delete branch após merge

## 🐛 Issues

### Reportando Bugs

Use o template de bug report:

```markdown
## Descrição do Bug
Descrição clara e concisa do problema.

## Para Reproduzir
1. Execute comando '...'
2. Com opções '...'
3. Veja erro

## Comportamento Esperado
O que deveria acontecer.

## Screenshots
(Se aplicável)

## Ambiente
- OS: [Windows/Mac/Linux]
- Node.js: [versão]
- Mangaba CLI: [versão]
- Provider: [OpenAI/Gemini/etc.]

## Contexto Adicional
Qualquer informação adicional relevante.
```

### Solicitando Features

```markdown
## Descrição da Feature
Descrição clara da funcionalidade desejada.

## Problema que Resolve
Que problema esta feature resolveria?

## Solução Proposta
Como você imagina que deveria funcionar?

## Alternativas Consideradas
Outras soluções que você considerou?

## Contexto Adicional
Informações adicionais relevantes.
```

### Labels

- **bug**: Algo não está funcionando
- **enhancement**: Nova feature ou melhoria
- **documentation**: Melhorias na documentação
- **good first issue**: Bom para iniciantes
- **help wanted**: Ajuda extra é bem-vinda
- **priority: high**: Alta prioridade
- **priority: low**: Baixa prioridade
- **wontfix**: Não será corrigido
- **duplicate**: Issue duplicada

## 👥 Comunidade

### Canais de Comunicação

- **GitHub Issues**: Bugs e feature requests
- **GitHub Discussions**: Discussões gerais
- **Discord**: Chat em tempo real (link)
- **Twitter**: Atualizações (@mangaba_cli)

### Código de Conduta

Todos os participantes devem seguir nosso [Código de Conduta](CODE_OF_CONDUCT.md):

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

### Reconhecimento

Contribuições são reconhecidas:

- **Contributors**: Lista no README
- **Changelog**: Créditos nas releases
- **Hall of Fame**: Contribuidores especiais
- **Swag**: Brindes para contribuições significativas

## 🎯 Roadmap

### Próximas Versões

#### v2.1.0
- [ ] Suporte a plugins
- [ ] Interface web opcional
- [ ] Melhor cache de respostas
- [ ] Modo offline limitado

#### v2.2.0
- [ ] Integração com IDEs
- [ ] Templates customizáveis
- [ ] Análise de repositórios Git
- [ ] Métricas avançadas

#### v3.0.0
- [ ] Arquitetura de microserviços
- [ ] API REST
- [ ] Dashboard web
- [ ] Colaboração em equipe

### Como Contribuir para o Roadmap

1. Participe das discussões no GitHub
2. Vote em features prioritárias
3. Implemente features do roadmap
4. Sugira novas direções

## 📊 Métricas e Analytics

### Métricas que Acompanhamos

- **Performance**: Tempo de resposta, uso de memória
- **Qualidade**: Cobertura de testes, bugs reportados
- **Adoção**: Downloads, usuários ativos
- **Contribuições**: PRs, issues, contributors

### Ferramentas

- **GitHub Analytics**: Insights do repositório
- **npm Analytics**: Downloads e uso
- **CodeClimate**: Qualidade de código
- **Codecov**: Cobertura de testes

## 🚀 Release Process

### Preparação da Release

1. **Atualizar versão**
```bash
npm version [major|minor|patch]
```

2. **Atualizar CHANGELOG**
```bash
npm run changelog
```

3. **Executar testes completos**
```bash
npm run test:all
```

4. **Build de produção**
```bash
npm run build
```

5. **Tag e push**
```bash
git push origin main --tags
```

### Publicação

```bash
# Publicar no npm
npm publish

# Criar release no GitHub
gh release create v1.0.0 --generate-notes
```

### Pós-Release

1. Anunciar nas redes sociais
2. Atualizar documentação
3. Notificar usuários importantes
4. Monitorar feedback

---

## 🙏 Agradecimentos

Obrigado por contribuir com o Mangaba CLI! Sua ajuda torna este projeto melhor para toda a comunidade.

### Principais Contribuidores

- [@usuario1](https://github.com/usuario1) - Criador e maintainer
- [@usuario2](https://github.com/usuario2) - Provider Gemini
- [@usuario3](https://github.com/usuario3) - Documentação

### Como ser Reconhecido

Todas as contribuições são valiosas e reconhecidas:

- **First-time contributors**: Menção especial
- **Regular contributors**: Badge no perfil
- **Core contributors**: Acesso de maintainer
- **Special recognition**: Para contribuições excepcionais

---

**💡 Lembre-se**: Não há contribuição pequena demais. Desde correções de typos até novas features, toda ajuda é bem-vinda!

**🔗 Links Úteis:**
- [Código de Conduta](CODE_OF_CONDUCT.md)
- [Licença](LICENSE)
- [Roadmap](https://github.com/projeto/roadmap)
- [Discussões](https://github.com/projeto/discussions)