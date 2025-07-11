# 📚 Referência da API

## Visão Geral

Esta documentação detalha todos os comandos, opções e APIs disponíveis no Mangaba CLI.

## Estrutura de Comandos

### Sintaxe Geral
```bash
mangaba <comando> [argumentos] [opções]
```

### Opções Globais

| Opção | Alias | Tipo | Descrição |
|-------|-------|------|----------|
| `--help` | `-h` | boolean | Exibe ajuda do comando |
| `--version` | `-v` | boolean | Exibe versão do CLI |
| `--verbose` | `-V` | boolean | Modo verboso com logs detalhados |
| `--quiet` | `-q` | boolean | Modo silencioso (apenas erros) |
| `--debug` | | boolean | Ativa logs de debug |
| `--provider` | `-p` | string | Especifica provider de IA |
| `--config` | `-c` | string | Arquivo de configuração customizado |
| `--output` | `-o` | string | Arquivo de saída |
| `--format` | `-f` | string | Formato de saída (json, md, txt) |

## Comandos Principais

### 1. `task` - Execução de Tarefas

Executa tarefas gerais com assistência de IA.

#### Sintaxe
```bash
mangaba task <descrição> [opções]
```

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|----------|
| `descrição` | string | ✅ | Descrição da tarefa a ser executada |

#### Opções Específicas

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|----------|
| `--file` | string | - | Arquivo para análise/modificação |
| `--context` | string | - | Contexto adicional para a tarefa |
| `--save` | boolean | false | Salvar resultado automaticamente |
| `--interactive` | boolean | false | Modo interativo com confirmações |
| `--template` | string | - | Template base para geração |

#### Exemplos

```bash
# Tarefa simples
mangaba task "Explique como funciona async/await em JavaScript"

# Com arquivo específico
mangaba task --file app.js "Refatore este código para usar ES6"

# Com contexto
mangaba task "Crie testes" --context "projeto React com Jest"

# Salvar resultado
mangaba task "Crie README" --output README.md

# Modo interativo
mangaba task "Refatore código" --interactive
```

#### Códigos de Retorno

| Código | Descrição |
|--------|----------|
| 0 | Sucesso |
| 1 | Erro geral |
| 2 | Erro de configuração |
| 3 | Erro de provider |
| 4 | Arquivo não encontrado |

### 2. `code` - Análise de Código

Comando especializado para análise e manipulação de código.

#### Sintaxe
```bash
mangaba code <arquivo|diretório> [ação] [opções]
```

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|----------|
| `arquivo|diretório` | string | ✅ | Caminho do arquivo ou diretório |

#### Ações Disponíveis

| Ação | Descrição | Exemplo |
|------|-----------|--------|
| `--analyze` | Análise completa do código | `mangaba code app.js --analyze` |
| `--refactor` | Refatoração automática | `mangaba code app.js --refactor` |
| `--test` | Geração de testes | `mangaba code app.js --test` |
| `--docs` | Geração de documentação | `mangaba code app.js --docs` |
| `--explain` | Explicação do código | `mangaba code app.js --explain` |
| `--optimize` | Otimização de performance | `mangaba code app.js --optimize` |
| `--review` | Code review | `mangaba code app.js --review` |
| `--fix` | Correção automática | `mangaba code app.js --fix` |

#### Opções Específicas

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|----------|
| `--backup` | boolean | false | Criar backup antes de modificar |
| `--report` | boolean | false | Gerar relatório detalhado |
| `--metrics` | boolean | false | Incluir métricas de código |
| `--recursive` | boolean | false | Processar diretórios recursivamente |
| `--exclude` | string[] | [] | Padrões de arquivos a excluir |
| `--include` | string[] | [] | Padrões de arquivos a incluir |
| `--language` | string | auto | Linguagem do código (js, ts, py, etc.) |

#### Exemplos

```bash
# Análise básica
mangaba code src/app.js --analyze

# Análise com relatório
mangaba code src/ --analyze --report --recursive

# Refatoração com backup
mangaba code legacy.js --refactor --backup

# Gerar testes
mangaba code utils.js --test --output tests/utils.test.js

# Documentação JSDoc
mangaba code api.js --docs --format jsdoc

# Análise excluindo node_modules
mangaba code . --analyze --recursive --exclude "node_modules/**"
```

### 3. `search` - Busca Inteligente

Sistema de busca avançado para arquivos e conteúdo.

#### Sintaxe
```bash
mangaba search <termo> [opções]
```

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|----------|
| `termo` | string | ✅ | Termo de busca |

#### Opções Específicas

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|----------|
| `--dir` | string | . | Diretório de busca |
| `--type` | string | - | Tipo de arquivo (js, ts, py, etc.) |
| `--regex` | boolean | false | Usar expressão regular |
| `--content` | boolean | false | Buscar no conteúdo dos arquivos |
| `--case-sensitive` | boolean | false | Busca sensível a maiúsculas |
| `--max-results` | number | 50 | Máximo de resultados |
| `--size` | string | - | Filtro por tamanho (>1MB, <500KB) |
| `--modified` | string | - | Filtro por data (today, week, month) |
| `--exclude-dirs` | string[] | [node_modules] | Diretórios a excluir |

#### Exemplos

```bash
# Busca simples
mangaba search "função login"

# Busca em diretório específico
mangaba search "API" --dir src/

# Busca por tipo de arquivo
mangaba search "config" --type js

# Busca com regex
mangaba search "function\s+\w+" --regex

# Busca no conteúdo
mangaba search "import React" --content

# Busca por tamanho
mangaba search "*.log" --size ">1MB"

# Busca por data
mangaba search "*.js" --modified "last week"
```

### 4. `shell` - Comandos do Sistema

Executa comandos do sistema com explicações da IA.

#### Sintaxe
```bash
mangaba shell <comando> [opções]
```

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|----------|
| `comando` | string | ✅ | Comando a ser executado |

#### Opções Específicas

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|----------|
| `--explain` | boolean | false | Explicar comando antes de executar |
| `--safe` | boolean | false | Pedir confirmação antes de executar |
| `--dry-run` | boolean | false | Simular execução sem executar |
| `--timeout` | number | 30000 | Timeout em milissegundos |
| `--cwd` | string | . | Diretório de trabalho |

#### Exemplos

```bash
# Comando simples
mangaba shell "npm install express"

# Com explicação
mangaba shell "find . -name '*.js'" --explain

# Modo seguro
mangaba shell "rm -rf temp/" --safe

# Dry run
mangaba shell "git push origin main" --dry-run

# Com timeout customizado
mangaba shell "npm test" --timeout 60000
```

### 5. `web` - Busca Web

Pesquisa na internet e análise de conteúdo web.

#### Sintaxe
```bash
mangaba web <consulta|--url URL> [opções]
```

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|----------|
| `consulta` | string | ✅* | Consulta de busca |
| `--url` | string | ✅* | URL específica para análise |

*Um dos dois é obrigatório

#### Opções Específicas

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|----------|
| `--analyze` | boolean | false | Analisar resultados |
| `--summarize` | boolean | false | Resumir conteúdo |
| `--extract-code` | boolean | false | Extrair exemplos de código |
| `--lang` | string | pt | Idioma da busca |
| `--num-results` | number | 5 | Número de resultados |
| `--recent` | boolean | false | Apenas resultados recentes |

#### Exemplos

```bash
# Busca simples
mangaba web "Node.js best practices 2024"

# Busca com análise
mangaba web "React hooks tutorial" --analyze

# Analisar URL específica
mangaba web --url "https://nodejs.org/docs" --summarize

# Extrair código
mangaba web "JavaScript async examples" --extract-code

# Busca em português
mangaba web "tutorial Vue.js" --lang pt
```

### 6. `context` - Gerenciamento de Contexto

Gerencia o contexto da conversa.

#### Subcomandos

##### `context add`
```bash
mangaba context add <texto>
```

##### `context show`
```bash
mangaba context show [--format json|md]
```

##### `context search`
```bash
mangaba context search <termo>
```

##### `context clear`
```bash
mangaba context clear [--confirm]
```

##### `context export`
```bash
mangaba context export [arquivo]
```

##### `context import`
```bash
mangaba context import <arquivo>
```

#### Exemplos

```bash
# Adicionar contexto
mangaba context add "Este é um projeto React com TypeScript"

# Ver contexto
mangaba context show

# Buscar no contexto
mangaba context search "React"

# Exportar contexto
mangaba context export > backup.json

# Importar contexto
mangaba context import backup.json

# Limpar contexto
mangaba context clear --confirm
```

### 7. `config` - Configuração

Gerencia configurações do CLI.

#### Subcomandos

##### `config list`
```bash
mangaba config list [--local|--global]
```

##### `config get`
```bash
mangaba config get <chave>
```

##### `config set`
```bash
mangaba config set <chave> <valor> [--local]
```

##### `config remove`
```bash
mangaba config remove <chave> [--local]
```

##### `config init`
```bash
mangaba config init [--local] [--force]
```

##### `config validate`
```bash
mangaba config validate [--file arquivo]
```

##### `config export`
```bash
mangaba config export [arquivo]
```

##### `config import`
```bash
mangaba config import <arquivo>
```

##### `config reset`
```bash
mangaba config reset [--confirm]
```

#### Exemplos

```bash
# Listar configurações
mangaba config list

# Ver configuração específica
mangaba config get provider

# Definir configuração
mangaba config set openai.apiKey "sk-..."

# Configuração local
mangaba config set provider gemini --local

# Remover configuração
mangaba config remove openai.model

# Inicializar configuração
mangaba config init

# Validar configuração
mangaba config validate

# Backup
mangaba config export > config-backup.json

# Restaurar
mangaba config import config-backup.json

# Reset
mangaba config reset --confirm
```

### 8. `providers` - Gerenciamento de Providers

Gerencia providers de IA.

#### Sintaxe
```bash
mangaba providers [opções]
```

#### Opções

| Opção | Tipo | Descrição |
|-------|------|----------|
| `--models` | boolean | Listar modelos disponíveis |
| `--status` | boolean | Status de cada provider |
| `--test` | string | Testar provider específico |

#### Exemplos

```bash
# Listar providers
mangaba providers

# Ver modelos
mangaba providers --models

# Status dos providers
mangaba providers --status

# Testar provider
mangaba providers --test openai
```

### 9. `test` - Testes e Validação

Testa conexões e configurações.

#### Subcomandos

##### `test connection`
```bash
mangaba test connection [--provider nome] [--all]
```

##### `test config`
```bash
mangaba test config [--provider nome]
```

#### Exemplos

```bash
# Testar conexão atual
mangaba test connection

# Testar provider específico
mangaba test connection --provider openai

# Testar todos os providers
mangaba test connection --all

# Testar configuração
mangaba test config
```

### 10. `stats` - Estatísticas

Exibe estatísticas de uso.

#### Sintaxe
```bash
mangaba stats [opções]
```

#### Opções

| Opção | Tipo | Descrição |
|-------|------|----------|
| `--detailed` | boolean | Estatísticas detalhadas |
| `--period` | string | Período (day, week, month) |
| `--export` | string | Exportar para arquivo |
| `--clear` | boolean | Limpar estatísticas |

#### Exemplos

```bash
# Estatísticas básicas
mangaba stats

# Estatísticas detalhadas
mangaba stats --detailed

# Por período
mangaba stats --period week

# Exportar
mangaba stats --export stats.json

# Limpar
mangaba stats --clear
```

### 11. `tools` - Ferramentas Disponíveis

Lista ferramentas e funcionalidades.

#### Sintaxe
```bash
mangaba tools [--help comando]
```

#### Exemplos

```bash
# Listar ferramentas
mangaba tools

# Ajuda específica
mangaba tools --help search
```

### 12. `logs` - Gerenciamento de Logs

Gerencia logs do sistema.

#### Subcomandos

##### `logs show`
```bash
mangaba logs show [--level info|debug|error] [--tail n]
```

##### `logs export`
```bash
mangaba logs export [arquivo]
```

##### `logs clear`
```bash
mangaba logs clear [--confirm]
```

#### Exemplos

```bash
# Ver logs
mangaba logs show

# Logs de erro
mangaba logs show --level error

# Últimas 50 linhas
mangaba logs show --tail 50

# Exportar logs
mangaba logs export > debug.log

# Limpar logs
mangaba logs clear --confirm
```

## Configuração de Providers

### OpenAI

```bash
# Configuração básica
mangaba config set provider openai
mangaba config set openai.apiKey "sk-..."
mangaba config set openai.model "gpt-4"

# Configurações avançadas
mangaba config set openai.baseUrl "https://api.openai.com/v1"
mangaba config set openai.organization "org-..."
mangaba config set openai.maxTokens 2048
mangaba config set openai.temperature 0.7
```

### Google Gemini

```bash
mangaba config set provider gemini
mangaba config set gemini.apiKey "AIza..."
mangaba config set gemini.model "gemini-pro"
```

### Anthropic Claude

```bash
mangaba config set provider anthropic
mangaba config set anthropic.apiKey "sk-ant-..."
mangaba config set anthropic.model "claude-3-sonnet-20240229"
```

### Ollama

```bash
mangaba config set provider ollama
mangaba config set ollama.baseUrl "http://localhost:11434"
mangaba config set ollama.model "llama2"
```

### HuggingFace

```bash
mangaba config set provider huggingface
mangaba config set huggingface.apiKey "hf_..."
mangaba config set huggingface.model "microsoft/DialoGPT-medium"
```

### Cohere

```bash
mangaba config set provider cohere
mangaba config set cohere.apiKey "..."
mangaba config set cohere.model "command"
```

### Together AI

```bash
mangaba config set provider together
mangaba config set together.apiKey "..."
mangaba config set together.model "togethercomputer/llama-2-7b-chat"
```

### LocalAI

```bash
mangaba config set provider localai
mangaba config set localai.baseUrl "http://localhost:8080"
mangaba config set localai.model "gpt-3.5-turbo"
```

### Groq

```bash
mangaba config set provider groq
mangaba config set groq.apiKey "gsk_..."
mangaba config set groq.model "llama2-70b-4096"
```

## Variáveis de Ambiente

### Configuração Global

```bash
# Provider padrão
export MANGABA_PROVIDER=openai

# Configurações gerais
export MANGABA_LOG_LEVEL=info
export MANGABA_TIMEOUT=30000
export MANGABA_MAX_TOKENS=2048
export MANGABA_TEMPERATURE=0.7
export MANGABA_VERBOSE=false
export MANGABA_DEBUG=false

# Diretórios
export MANGABA_CONFIG_DIR=~/.mangaba
export MANGABA_CACHE_DIR=~/.mangaba/cache
export MANGABA_LOG_DIR=~/.mangaba/logs
```

### API Keys

```bash
# OpenAI
export OPENAI_API_KEY=sk-...
export OPENAI_MODEL=gpt-4
export OPENAI_BASE_URL=https://api.openai.com/v1
export OPENAI_ORGANIZATION=org-...

# Google Gemini
export GEMINI_API_KEY=AIza...
export GEMINI_MODEL=gemini-pro

# Anthropic
export ANTHROPIC_API_KEY=sk-ant-...
export ANTHROPIC_MODEL=claude-3-sonnet-20240229

# Ollama
export OLLAMA_BASE_URL=http://localhost:11434
export OLLAMA_MODEL=llama2

# HuggingFace
export HUGGINGFACE_API_KEY=hf_...
export HUGGINGFACE_MODEL=microsoft/DialoGPT-medium

# Cohere
export COHERE_API_KEY=...
export COHERE_MODEL=command

# Together AI
export TOGETHER_API_KEY=...
export TOGETHER_MODEL=togethercomputer/llama-2-7b-chat

# LocalAI
export LOCALAI_BASE_URL=http://localhost:8080
export LOCALAI_MODEL=gpt-3.5-turbo

# Groq
export GROQ_API_KEY=gsk_...
export GROQ_MODEL=llama2-70b-4096
```

## Códigos de Erro

| Código | Categoria | Descrição |
|--------|-----------|----------|
| 0 | Sucesso | Operação concluída com sucesso |
| 1 | Erro Geral | Erro não específico |
| 2 | Configuração | Erro de configuração |
| 3 | Provider | Erro do provider de IA |
| 4 | Arquivo | Arquivo não encontrado |
| 5 | Rede | Erro de conexão |
| 6 | Autenticação | Erro de API key ou autenticação |
| 7 | Limite | Limite de rate ou quota excedido |
| 8 | Validação | Erro de validação de entrada |
| 9 | Timeout | Operação expirou |
| 10 | Permissão | Erro de permissão de arquivo |

## Formatos de Saída

### JSON
```json
{
  "success": true,
  "data": {
    "result": "Resultado da operação",
    "metadata": {
      "provider": "openai",
      "model": "gpt-4",
      "tokens": 150,
      "duration": 2.5
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Markdown
```markdown
# Resultado da Análise

## Resumo
Resultado da operação...

## Detalhes
- Provider: OpenAI
- Model: GPT-4
- Tokens: 150
- Duração: 2.5s
```

### Texto Simples
```
Resultado da operação...

Provider: OpenAI
Model: GPT-4
Tokens: 150
Duração: 2.5s
```

## Integração com Scripts

### Bash
```bash
#!/bin/bash

# Verificar se comando foi bem-sucedido
if mangaba task "Analise este código" --quiet; then
  echo "Análise concluída com sucesso"
else
  echo "Erro na análise: $?"
  exit 1
fi

# Capturar saída
RESULT=$(mangaba task "Gere README" --format json)
echo "$RESULT" | jq '.data.result' > README.md
```

### PowerShell
```powershell
# Verificar status
$result = mangaba task "Analise código" --format json | ConvertFrom-Json
if ($result.success) {
    Write-Host "Sucesso: $($result.data.result)"
} else {
    Write-Error "Erro na operação"
}
```

### Node.js
```javascript
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

async function analyzeCode(file) {
  try {
    const { stdout } = await execAsync(`mangaba code ${file} --analyze --format json`);
    const result = JSON.parse(stdout);
    return result.data.result;
  } catch (error) {
    console.error('Erro na análise:', error.message);
    throw error;
  }
}
```

### Python
```python
import subprocess
import json

def analyze_code(file_path):
    try:
        result = subprocess.run(
            ['mangaba', 'code', file_path, '--analyze', '--format', 'json'],
            capture_output=True,
            text=True,
            check=True
        )
        data = json.loads(result.stdout)
        return data['data']['result']
    except subprocess.CalledProcessError as e:
        print(f"Erro na análise: {e}")
        raise
```

---

**📝 Notas Importantes:**

1. **Versionamento**: Esta API segue versionamento semântico
2. **Compatibilidade**: Mudanças breaking são sinalizadas em major versions
3. **Deprecação**: Recursos obsoletos são marcados antes da remoção
4. **Rate Limits**: Respeite os limites dos providers de IA
5. **Segurança**: Nunca exponha API keys em logs ou repositórios

**🔗 Links Relacionados:**
- [Guia de Configuração](configuration.md)
- [Exemplos Práticos](examples.md)
- [FAQ](faq.md)