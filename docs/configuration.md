# ⚙️ Guia de Configuração

## Visão Geral

O Mangaba CLI suporta múltiplos providers de IA, cada um com suas próprias configurações específicas. Este guia detalha como configurar cada provider disponível.

## Estrutura de Configuração

### Arquivo de Configuração

O Mangaba CLI armazena configurações em:
- **Global**: `~/.mangaba/config.json`
- **Local**: `./mangaba.config.json` (por projeto)
- **Variáveis de Ambiente**: `.env`

### Prioridade de Configuração

1. **Argumentos da linha de comando** (maior prioridade)
2. **Variáveis de ambiente**
3. **Configuração local do projeto**
4. **Configuração global**
5. **Valores padrão** (menor prioridade)

## Providers Suportados

### 1. OpenAI

#### Configuração Básica
```bash
# Via CLI
mangaba config set provider openai
mangaba config set openai.apiKey "sk-..."
mangaba config set openai.model "gpt-4"
```

#### Variáveis de Ambiente
```env
OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-4
OPENAI_BASE_URL=https://api.openai.com/v1  # opcional
OPENAI_ORGANIZATION=org-...  # opcional
```

#### Modelos Disponíveis
- `gpt-4` - Modelo mais avançado
- `gpt-4-turbo` - Versão otimizada do GPT-4
- `gpt-3.5-turbo` - Rápido e eficiente
- `gpt-3.5-turbo-16k` - Contexto estendido

#### Configurações Avançadas
```json
{
  "openai": {
    "apiKey": "sk-...",
    "model": "gpt-4",
    "baseUrl": "https://api.openai.com/v1",
    "organization": "org-...",
    "maxTokens": 2048,
    "temperature": 0.7,
    "topP": 1,
    "frequencyPenalty": 0,
    "presencePenalty": 0
  }
}
```

### 2. Google Gemini

#### Configuração Básica
```bash
mangaba config set provider gemini
mangaba config set gemini.apiKey "AIza..."
mangaba config set gemini.model "gemini-pro"
```

#### Variáveis de Ambiente
```env
GEMINI_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-pro
```

#### Modelos Disponíveis
- `gemini-pro` - Modelo principal
- `gemini-pro-vision` - Com suporte a imagens
- `gemini-1.5-pro` - Versão mais recente

### 3. Anthropic Claude

#### Configuração Básica
```bash
mangaba config set provider anthropic
mangaba config set anthropic.apiKey "sk-ant-..."
mangaba config set anthropic.model "claude-3-sonnet-20240229"
```

#### Variáveis de Ambiente
```env
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-sonnet-20240229
```

#### Modelos Disponíveis
- `claude-3-opus-20240229` - Mais poderoso
- `claude-3-sonnet-20240229` - Equilibrado
- `claude-3-haiku-20240307` - Mais rápido
- `claude-2.1` - Versão anterior

### 4. Ollama (Local)

#### Configuração Básica
```bash
mangaba config set provider ollama
mangaba config set ollama.baseUrl "http://localhost:11434"
mangaba config set ollama.model "llama2"
```

#### Variáveis de Ambiente
```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2
```

#### Instalação do Ollama
```bash
# Instalar Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Baixar modelo
ollama pull llama2
ollama pull codellama
ollama pull mistral
```

#### Modelos Populares
- `llama2` - Modelo geral
- `codellama` - Especializado em código
- `mistral` - Eficiente e rápido
- `phi` - Modelo compacto
- `neural-chat` - Conversação

### 5. HuggingFace

#### Configuração Básica
```bash
mangaba config set provider huggingface
mangaba config set huggingface.apiKey "hf_..."
mangaba config set huggingface.model "microsoft/DialoGPT-medium"
```

#### Variáveis de Ambiente
```env
HUGGINGFACE_API_KEY=hf_...
HUGGINGFACE_MODEL=microsoft/DialoGPT-medium
```

#### Modelos Recomendados
- `microsoft/DialoGPT-medium` - Conversação
- `facebook/blenderbot-400M-distill` - Chat
- `microsoft/CodeBERT-base` - Código
- `google/flan-t5-large` - Tarefas gerais

### 6. Cohere

#### Configuração Básica
```bash
mangaba config set provider cohere
mangaba config set cohere.apiKey "..."
mangaba config set cohere.model "command"
```

#### Variáveis de Ambiente
```env
COHERE_API_KEY=...
COHERE_MODEL=command
```

#### Modelos Disponíveis
- `command` - Modelo principal
- `command-light` - Versão leve
- `command-nightly` - Versão experimental

### 7. Together AI

#### Configuração Básica
```bash
mangaba config set provider together
mangaba config set together.apiKey "..."
mangaba config set together.model "togethercomputer/llama-2-7b-chat"
```

#### Variáveis de Ambiente
```env
TOGETHER_API_KEY=...
TOGETHER_MODEL=togethercomputer/llama-2-7b-chat
```

#### Modelos Populares
- `togethercomputer/llama-2-7b-chat` - Llama 2 7B
- `togethercomputer/llama-2-13b-chat` - Llama 2 13B
- `mistralai/Mistral-7B-Instruct-v0.1` - Mistral 7B
- `codellama/CodeLlama-34b-Instruct-hf` - Code Llama

### 8. LocalAI

#### Configuração Básica
```bash
mangaba config set provider localai
mangaba config set localai.baseUrl "http://localhost:8080"
mangaba config set localai.model "gpt-3.5-turbo"
```

#### Variáveis de Ambiente
```env
LOCALAI_BASE_URL=http://localhost:8080
LOCALAI_MODEL=gpt-3.5-turbo
```

#### Instalação do LocalAI
```bash
# Docker
docker run -p 8080:8080 --name local-ai -ti localai/localai:latest

# Docker Compose
wget https://raw.githubusercontent.com/go-skynet/LocalAI/master/docker-compose.yaml
docker-compose up
```

### 9. Groq

#### Configuração Básica
```bash
mangaba config set provider groq
mangaba config set groq.apiKey "gsk_..."
mangaba config set groq.model "llama2-70b-4096"
```

#### Variáveis de Ambiente
```env
GROQ_API_KEY=gsk_...
GROQ_MODEL=llama2-70b-4096
```

#### Modelos Disponíveis
- `llama2-70b-4096` - Llama 2 70B
- `mixtral-8x7b-32768` - Mixtral 8x7B
- `gemma-7b-it` - Gemma 7B
- `llama3-8b-8192` - Llama 3 8B
- `llama3-70b-8192` - Llama 3 70B

## Comandos de Configuração

### Gerenciamento Básico

```bash
# Listar todas as configurações
mangaba config list

# Ver configuração específica
mangaba config get openai.apiKey

# Definir configuração
mangaba config set openai.model "gpt-4"

# Remover configuração
mangaba config remove openai.apiKey

# Limpar todas as configurações
mangaba config clear
```

### Configuração por Projeto

```bash
# Inicializar configuração local
mangaba config init --local

# Configurar provider local
mangaba config set provider gemini --local

# Ver configuração local
mangaba config list --local
```

### Backup e Restauração

```bash
# Exportar configuração
mangaba config export > backup.json

# Importar configuração
mangaba config import backup.json

# Resetar para padrões
mangaba config reset
```

## Configurações Avançadas

### Múltiplos Providers

```json
{
  "defaultProvider": "openai",
  "providers": {
    "openai": {
      "apiKey": "sk-...",
      "model": "gpt-4"
    },
    "gemini": {
      "apiKey": "AIza...",
      "model": "gemini-pro"
    },
    "ollama": {
      "baseUrl": "http://localhost:11434",
      "model": "llama2"
    }
  }
}
```

### Configurações Globais

```json
{
  "global": {
    "maxTokens": 2048,
    "temperature": 0.7,
    "timeout": 30000,
    "retries": 3,
    "debug": false,
    "logLevel": "info"
  }
}
```

### Perfis de Configuração

```bash
# Criar perfil
mangaba config profile create desenvolvimento
mangaba config profile create producao

# Usar perfil
mangaba config profile use desenvolvimento

# Listar perfis
mangaba config profile list
```

## Validação e Testes

### Testar Configuração

```bash
# Testar provider atual
mangaba test connection

# Testar provider específico
mangaba test connection --provider openai

# Testar todos os providers
mangaba test connection --all
```

### Validar Configuração

```bash
# Validar configuração atual
mangaba config validate

# Validar arquivo específico
mangaba config validate --file config.json
```

## Solução de Problemas

### Problemas Comuns

#### API Key Inválida
```bash
# Verificar configuração
mangaba config get openai.apiKey

# Testar conexão
mangaba test connection --provider openai
```

#### Provider Não Responde
```bash
# Verificar URL base
mangaba config get ollama.baseUrl

# Testar conectividade
curl http://localhost:11434/api/tags
```

#### Configuração Corrompida
```bash
# Resetar configuração
mangaba config reset

# Recriar configuração
mangaba config init
```

### Debug e Logs

```bash
# Ativar debug
mangaba config set global.debug true

# Ver logs detalhados
mangaba --verbose task "teste"

# Exportar logs
mangaba logs export > debug.log
```

## Segurança

### Boas Práticas

1. **Nunca commitar API keys** no controle de versão
2. **Usar variáveis de ambiente** para chaves sensíveis
3. **Rotacionar chaves** regularmente
4. **Usar configuração local** para projetos específicos
5. **Fazer backup** das configurações importantes

### Proteção de Chaves

```bash
# Usar arquivo .env (não commitado)
echo "OPENAI_API_KEY=sk-..." >> .env
echo ".env" >> .gitignore

# Ou usar gerenciador de secrets
export OPENAI_API_KEY=$(vault kv get -field=api_key secret/openai)
```

---

**📚 Próximos Passos:**
- [Guia de Uso](usage.md)
- [Exemplos Práticos](examples.md)
- [Referência da API](api-reference.md)