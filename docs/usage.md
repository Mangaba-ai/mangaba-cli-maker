# 📖 Guia de Uso

## Visão Geral

O Mangaba CLI é uma ferramenta poderosa de desenvolvimento assistido por IA que oferece múltiplas funcionalidades para análise de código, automação de tarefas, busca inteligente e muito mais.

## Comandos Principais

### 1. Execução de Tarefas (`task`)

O comando principal para executar tarefas com IA.

#### Sintaxe Básica
```bash
mangaba task "sua tarefa aqui"
```

#### Exemplos Práticos

```bash
# Análise geral
mangaba task "Analise este projeto e sugira melhorias"

# Geração de código
mangaba task "Crie uma API REST em Node.js para gerenciar usuários"

# Correção de bugs
mangaba task "Encontre e corrija os bugs no arquivo app.js"

# Documentação
mangaba task "Gere documentação completa para este projeto"

# Testes
mangaba task "Crie testes unitários para todas as funções"
```

#### Opções Avançadas

```bash
# Especificar arquivo
mangaba task -f arquivo.js "Refatore este código"

# Usar provider específico
mangaba task --provider gemini "Analise este código"

# Salvar resultado
mangaba task "Crie README" --output README.md

# Modo verboso
mangaba task "Analise" --verbose

# Definir contexto
mangaba task "Otimize" --context "projeto React"
```

### 2. Análise de Código (`code`)

Comando especializado para análise e manipulação de código.

#### Sintaxe
```bash
mangaba code [arquivo] [opções]
```

#### Modos de Análise

```bash
# Análise completa
mangaba code app.js --analyze

# Refatoração
mangaba code app.js --refactor

# Geração de testes
mangaba code app.js --test

# Documentação
mangaba code app.js --docs

# Explicação
mangaba code app.js --explain

# Otimização
mangaba code app.js --optimize
```

#### Exemplos Detalhados

```bash
# Análise com relatório detalhado
mangaba code src/ --analyze --report

# Refatoração com backup
mangaba code app.js --refactor --backup

# Gerar testes e salvar
mangaba code utils.js --test --output tests/utils.test.js

# Documentar com JSDoc
mangaba code api.js --docs --format jsdoc
```

### 3. Busca Inteligente (`search`)

Sistema de busca avançado para encontrar arquivos e conteúdo.

#### Busca por Arquivos
```bash
# Busca simples
mangaba search "função login"

# Busca em diretório específico
mangaba search "API" --dir src/

# Busca por tipo de arquivo
mangaba search "config" --type js

# Busca com regex
mangaba search "function\s+\w+" --regex
```

#### Busca por Conteúdo
```bash
# Buscar texto em arquivos
mangaba search --content "import React"

# Buscar padrões
mangaba search --pattern "*.test.js"

# Buscar por tamanho
mangaba search --size ">1MB"

# Buscar modificados recentemente
mangaba search --modified "last week"
```

### 4. Comandos Shell (`shell`)

Execute comandos do sistema com explicações da IA.

#### Sintaxe
```bash
mangaba shell "comando"
```

#### Exemplos

```bash
# Comando simples
mangaba shell "npm install express"

# Comando complexo
mangaba shell "find . -name '*.js' -exec grep -l 'TODO' {} \;"

# Com explicação
mangaba shell "docker run -p 3000:3000 app" --explain

# Modo seguro (pergunta antes de executar)
mangaba shell "rm -rf node_modules" --safe
```

### 5. Busca Web (`web`)

Pesquise na internet e analise conteúdo web.

#### Busca Básica
```bash
# Pesquisa simples
mangaba web "Node.js best practices 2024"

# Pesquisa com análise
mangaba web "React hooks tutorial" --analyze

# Pesquisa em idioma específico
mangaba web "Vue.js tutorial" --lang pt
```

#### Análise de URLs
```bash
# Analisar página específica
mangaba web --url "https://nodejs.org/docs"

# Analisar e resumir
mangaba web --url "https://example.com" --summarize

# Extrair código de exemplos
mangaba web --url "https://tutorial.com" --extract-code
```

### 6. Gerenciamento de Contexto (`context`)

Gerencie o contexto da conversa para manter continuidade.

#### Comandos de Contexto

```bash
# Adicionar contexto
mangaba context add "Este é um projeto React com TypeScript"

# Ver contexto atual
mangaba context show

# Buscar no contexto
mangaba context search "React"

# Exportar contexto
mangaba context export > contexto.json

# Importar contexto
mangaba context import contexto.json

# Limpar contexto
mangaba context clear
```

#### Contexto Automático
```bash
# Adicionar arquivo ao contexto
mangaba context add-file package.json

# Adicionar diretório
mangaba context add-dir src/

# Contexto do projeto
mangaba context project-info
```

### 7. Configuração (`config`)

Gerencie configurações do CLI.

#### Comandos Básicos

```bash
# Listar configurações
mangaba config list

# Ver configuração específica
mangaba config get provider

# Definir configuração
mangaba config set provider openai

# Remover configuração
mangaba config remove openai.apiKey
```

#### Configuração Avançada

```bash
# Inicializar configuração
mangaba config init

# Configuração local (por projeto)
mangaba config init --local

# Backup de configuração
mangaba config export > backup.json

# Restaurar configuração
mangaba config import backup.json

# Resetar configurações
mangaba config reset
```

### 8. Informações e Utilitários

#### Listar Providers
```bash
# Ver todos os providers
mangaba providers

# Ver modelos disponíveis
mangaba providers --models

# Testar conexão
mangaba test connection
```

#### Estatísticas
```bash
# Ver estatísticas de uso
mangaba stats

# Estatísticas detalhadas
mangaba stats --detailed

# Limpar estatísticas
mangaba stats --clear
```

#### Ferramentas Disponíveis
```bash
# Listar todas as ferramentas
mangaba tools

# Ajuda sobre ferramenta específica
mangaba tools --help search
```

## Fluxos de Trabalho Comuns

### 1. Desenvolvimento de Nova Feature

```bash
# 1. Analisar requisitos
mangaba task "Analise os requisitos para implementar autenticação JWT"

# 2. Planejar arquitetura
mangaba task "Crie um plano de arquitetura para sistema de auth"

# 3. Gerar código base
mangaba task "Crie middleware de autenticação JWT em Node.js"

# 4. Gerar testes
mangaba code auth.js --test

# 5. Documentar
mangaba code auth.js --docs
```

### 2. Debug e Correção de Bugs

```bash
# 1. Analisar erro
mangaba task -f error.log "Analise este erro e sugira soluções"

# 2. Buscar código relacionado
mangaba search "função que causa erro"

# 3. Analisar código problemático
mangaba code problematic.js --analyze

# 4. Aplicar correção
mangaba task -f problematic.js "Corrija o bug identificado"

# 5. Gerar teste para prevenir regressão
mangaba code problematic.js --test
```

### 3. Refatoração de Código Legacy

```bash
# 1. Analisar código atual
mangaba code legacy.js --analyze

# 2. Identificar melhorias
mangaba task -f legacy.js "Identifique oportunidades de refatoração"

# 3. Refatorar gradualmente
mangaba code legacy.js --refactor --backup

# 4. Atualizar testes
mangaba code legacy.js --test

# 5. Documentar mudanças
mangaba task "Documente as mudanças na refatoração"
```

### 4. Pesquisa e Aprendizado

```bash
# 1. Pesquisar tecnologia
mangaba web "GraphQL best practices 2024"

# 2. Analisar documentação
mangaba web --url "https://graphql.org/learn/"

# 3. Criar exemplo prático
mangaba task "Crie exemplo de API GraphQL com resolvers"

# 4. Adicionar ao contexto
mangaba context add "Aprendendo GraphQL para novo projeto"
```

## Opções Globais

### Flags Comuns

```bash
# Modo verboso (mais detalhes)
--verbose, -v

# Especificar provider
--provider <nome>

# Arquivo de saída
--output <arquivo>

# Modo silencioso
--quiet, -q

# Ajuda
--help, -h

# Versão
--version

# Configuração específica
--config <arquivo>

# Modo debug
--debug
```

### Variáveis de Ambiente

```bash
# Provider padrão
export MANGABA_PROVIDER=openai

# Nível de log
export MANGABA_LOG_LEVEL=debug

# Timeout
export MANGABA_TIMEOUT=30000

# Modo verboso
export MANGABA_VERBOSE=true
```

## Personalização Avançada

### Aliases e Shortcuts

```bash
# Criar aliases úteis
alias ma="mangaba task"
alias mc="mangaba code"
alias ms="mangaba search"
alias mw="mangaba web"

# Usar aliases
ma "Analise este projeto"
mc app.js --refactor
ms "função login"
mw "React hooks tutorial"
```

### Scripts Personalizados

```bash
# Script para análise completa
#!/bin/bash
echo "Iniciando análise completa..."
mangaba code . --analyze --report
mangaba task "Gere relatório de qualidade do código"
mangaba task "Sugira melhorias de performance"
echo "Análise concluída!"
```

### Integração com IDEs

#### VS Code
```json
{
  "tasks": [
    {
      "label": "Mangaba: Analisar Arquivo",
      "type": "shell",
      "command": "mangaba",
      "args": ["code", "${file}", "--analyze"]
    },
    {
      "label": "Mangaba: Refatorar",
      "type": "shell",
      "command": "mangaba",
      "args": ["code", "${file}", "--refactor"]
    }
  ]
}
```

## Dicas e Truques

### 1. Contexto Efetivo
- Sempre adicione contexto relevante antes de tarefas complexas
- Use `mangaba context add-file` para incluir arquivos importantes
- Mantenha o contexto limpo e organizado

### 2. Comandos Compostos
```bash
# Análise e refatoração em sequência
mangaba code app.js --analyze && mangaba code app.js --refactor

# Busca e análise
mangaba search "TODO" | xargs -I {} mangaba code {} --analyze
```

### 3. Automação com Scripts
```bash
# Script de CI/CD
mangaba task "Analise qualidade do código" > quality-report.md
mangaba code . --test --output tests/
mangaba task "Gere documentação" --output docs/
```

### 4. Uso de Pipes
```bash
# Combinar com outras ferramentas
find . -name "*.js" | xargs mangaba code --analyze
git diff --name-only | xargs mangaba code --review
```

## Solução de Problemas

### Problemas Comuns

#### Comando Não Reconhecido
```bash
# Verificar instalação
mangaba --version

# Reinstalar se necessário
npm install -g mangaba-cli
```

#### Resposta Lenta
```bash
# Verificar provider
mangaba test connection

# Trocar para provider mais rápido
mangaba config set provider groq
```

#### Erro de Configuração
```bash
# Verificar configuração
mangaba config validate

# Resetar se necessário
mangaba config reset
```

### Debug Avançado

```bash
# Modo debug completo
DEBUG=* mangaba task "teste" --verbose

# Logs detalhados
mangaba --debug --verbose task "análise"

# Exportar logs
mangaba logs export > debug.log
```

---

**🚀 Próximos Passos:**
- [Exemplos Práticos](examples.md)
- [Referência da API](api-reference.md)
- [Guia de Contribuição](contributing.md)