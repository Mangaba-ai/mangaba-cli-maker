# 📦 Guia de Instalação

## Pré-requisitos

### Requisitos do Sistema
- **Node.js**: Versão 16.0.0 ou superior
- **npm**: Versão 7.0.0 ou superior (incluído com Node.js)
- **Sistema Operacional**: Windows, macOS, ou Linux
- **Memória RAM**: Mínimo 4GB recomendado
- **Espaço em Disco**: 500MB livres

### Verificação dos Pré-requisitos

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version
```

## Instalação

### Método 1: Instalação Global (Recomendado)

```bash
# Instalar globalmente via npm
npm install -g mangaba-cli

# Verificar instalação
mangaba --version
```

### Método 2: Instalação Local

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/mangaba-cli.git
cd mangaba-cli

# Instalar dependências
npm install

# Criar link global (opcional)
npm link
```

### Método 3: Usando npx (Sem Instalação)

```bash
# Executar diretamente sem instalar
npx mangaba-cli --help
```

## Configuração Inicial

### 1. Configuração Básica

```bash
# Inicializar configuração
mangaba config init

# Configurar provider padrão
mangaba config set provider openai
```

### 2. Configuração de API Keys

#### OpenAI
```bash
mangaba config set openai.apiKey "sua-api-key-aqui"
mangaba config set openai.model "gpt-4"
```

#### Google Gemini
```bash
mangaba config set gemini.apiKey "sua-api-key-aqui"
mangaba config set gemini.model "gemini-pro"
```

#### Anthropic Claude
```bash
mangaba config set anthropic.apiKey "sua-api-key-aqui"
mangaba config set anthropic.model "claude-3-sonnet-20240229"
```

#### Ollama (Local)
```bash
mangaba config set ollama.baseUrl "http://localhost:11434"
mangaba config set ollama.model "llama2"
```

### 3. Verificação da Configuração

```bash
# Listar configurações
mangaba config list

# Testar conexão
mangaba test connection

# Listar providers disponíveis
mangaba providers
```

## Configuração Avançada

### Arquivo de Configuração (.env)

Crie um arquivo `.env` na raiz do projeto:

```env
# OpenAI
OPENAI_API_KEY=sua-api-key-aqui
OPENAI_MODEL=gpt-4

# Google Gemini
GEMINI_API_KEY=sua-api-key-aqui
GEMINI_MODEL=gemini-pro

# Anthropic
ANTHROPIC_API_KEY=sua-api-key-aqui
ANTHROPIC_MODEL=claude-3-sonnet-20240229

# Ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2

# HuggingFace
HUGGINGFACE_API_KEY=sua-api-key-aqui
HUGGINGFACE_MODEL=microsoft/DialoGPT-medium

# Cohere
COHERE_API_KEY=sua-api-key-aqui
COHERE_MODEL=command

# Together AI
TOGETHER_API_KEY=sua-api-key-aqui
TOGETHER_MODEL=togethercomputer/llama-2-7b-chat

# LocalAI
LOCALAI_BASE_URL=http://localhost:8080
LOCALAI_MODEL=gpt-3.5-turbo

# Groq
GROQ_API_KEY=sua-api-key-aqui
GROQ_MODEL=llama2-70b-4096

# Configurações Gerais
DEFAULT_PROVIDER=openai
MAX_TOKENS=2048
TEMPERATURE=0.7
DEBUG=false
```

### Configuração por Projeto

Cada projeto pode ter sua própria configuração:

```bash
# Inicializar configuração local
cd meu-projeto
mangaba config init --local

# Configurar provider específico para o projeto
mangaba config set provider gemini --local
```

## Solução de Problemas

### Problemas Comuns

#### Erro: "mangaba: command not found"

**Solução:**
```bash
# Reinstalar globalmente
npm uninstall -g mangaba-cli
npm install -g mangaba-cli

# Ou adicionar ao PATH
export PATH=$PATH:$(npm root -g)/mangaba-cli/bin
```

#### Erro: "API Key inválida"

**Solução:**
```bash
# Verificar configuração
mangaba config get openai.apiKey

# Reconfigurar API key
mangaba config set openai.apiKey "nova-api-key"

# Testar conexão
mangaba test connection
```

#### Erro: "Módulo não encontrado"

**Solução:**
```bash
# Limpar cache do npm
npm cache clean --force

# Reinstalar dependências
npm install
```

### Logs e Debug

```bash
# Ativar modo debug
export DEBUG=true
mangaba task "teste" --verbose

# Ver logs
mangaba logs

# Limpar logs
mangaba logs --clear
```

## Atualização

### Atualizar para Última Versão

```bash
# Via npm
npm update -g mangaba-cli

# Verificar versão
mangaba --version
```

### Verificar Atualizações Disponíveis

```bash
# Verificar versão atual vs disponível
npm outdated -g mangaba-cli
```

## Desinstalação

```bash
# Desinstalar globalmente
npm uninstall -g mangaba-cli

# Remover configurações (opcional)
rm -rf ~/.mangaba
```

## Próximos Passos

Após a instalação bem-sucedida:

1. 📖 Leia o [Guia de Uso](usage.md)
2. 🔧 Configure seu [Provider Preferido](configuration.md)
3. 💡 Explore os [Exemplos Práticos](examples.md)
4. 🚀 Comece com o [Tutorial Rápido](quick-start.md)

---

**💡 Dica:** Use `mangaba --help` para ver todos os comandos disponíveis a qualquer momento!