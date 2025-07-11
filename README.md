# Mangaba CLI Maker

🤖 **CLI AI Agent agnóstico e poderoso inspirado no Gemini CLI**

Um agente de IA via linha de comando que suporta múltiplos provedores de modelos de linguagem, incluindo OpenAI, Google Gemini, Anthropic Claude e Ollama (modelos locais), oferecendo funcionalidades avançadas para desenvolvimento e automação.

## ✨ Características

- 🔄 **Agnóstico a APIs**: Suporte para OpenAI, Gemini, Anthropic, Ollama, HuggingFace, Cohere, Together AI, LocalAI e Groq
- ⚙️ **Configuração Flexível**: Configure múltiplos provedores e modelos
- 🎯 **Interface Avançada**: CLI rico com múltiplos comandos especializados
- 📊 **Análise de Código**: Análise, refatoração e geração de documentação
- 🔍 **Busca Inteligente**: Busca em arquivos e conteúdo web
- 🖥️ **Execução de Shell**: Comandos shell com explicações de IA
- 🧠 **Gerenciamento de Contexto**: Memória persistente e preferências
- 🎨 **Personalização**: Configuração via arquivo GEMINI.md
- 🏠 **Modelos Locais**: Suporte completo ao Ollama para privacidade
- 💾 **Configuração Persistente**: Salva configurações no diretório home

## 🚀 Instalação

### Pré-requisitos
- Node.js 16+ instalado
- NPM ou Yarn

### Instalação Local

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd mangaba-cli-maker

# Instale as dependências
npm install

# Torne o CLI disponível globalmente
npm link
```

### Instalação via NPM (quando publicado)

```bash
npm install -g mangaba-cli-maker
```

## ⚙️ Configuração

Antes de usar, configure pelo menos um provedor de IA:

```bash
mangaba config
```

Este comando irá guiá-lo através da configuração interativa para:

### 🔑 OpenAI
- API Key da OpenAI
- Modelo padrão (gpt-3.5-turbo, gpt-4, etc.)

### 🧠 Google Gemini
- API Key do Google AI Studio
- Modelo padrão (gemini-pro, gemini-pro-vision)

### 🎭 Anthropic Claude
- API Key da Anthropic
- Modelo padrão (claude-3-sonnet, claude-3-opus, etc.)

### 🏠 Ollama (Local)
- URL base (padrão: http://localhost:11434)
- Modelo padrão (llama2, mistral, etc.)

### 🤗 HuggingFace
- API Key do HuggingFace Hub
- Modelo padrão (microsoft/DialoGPT-large, etc.)

### 🔮 Cohere
- API Key da Cohere
- Modelo padrão (command, command-light, etc.)

### 🚀 Together AI
- API Key da Together AI
- Modelo padrão (llama-2-70b-chat, mistral-7b-instruct, etc.)

### 🔒 LocalAI
- URL base (padrão: http://localhost:8080)
- Modelo padrão (gpt-3.5-turbo, llama2, etc.)

### ⚡ Groq
- API Key do Groq
- Modelo padrão (llama-3.1-70b, mixtral-8x7b, etc.)

## 📋 Comandos

### Comandos Principais

```bash
# Configurar APIs
mangaba config

# Executar uma tarefa básica
mangaba task "Sua pergunta ou tarefa aqui"

# Executar tarefa com análise de arquivo
mangaba task -f arquivo.js "Explique este código"

# Executar comando shell com explicação
mangaba task -s "npm test" "Execute e explique os resultados"

# Listar APIs configuradas
mangaba list
```

### Comandos Avançados

```bash
# Busca em arquivos
mangaba search "padrão de busca" --type js --size ">1KB"
mangaba search "função.*config" --regex --dir src/

# Execução de shell com IA
mangaba shell "npm install express" --explain

# Análise e refatoração de código
mangaba code src/ --analyze
mangaba code arquivo.js --refactor --docs

# Pesquisa web
mangaba web "Node.js best practices 2024" --max 5
mangaba web --url "https://example.com" --analyze

# Gerenciamento de contexto/memória
mangaba memory add "Preferência: usar TypeScript"
mangaba memory get "preferências"
mangaba memory clear
mangaba memory export backup.json

# Estatísticas e ferramentas
mangaba stats
mangaba tools
```

### Execução com Provedores Específicos
```bash
# Execução interativa (escolhe provedor)
mangaba task

# Especificar provedor
mangaba task --provider openai

# Especificar provedor e modelo
mangaba task --provider gemini --model gemini-pro
```

### Ajuda
```bash
mangaba --help
mangaba <comando> --help
```

## 💡 Exemplos de Uso

### Exemplo 1: Análise de Código
```bash
mangaba task
# Tarefa: "Analise este código JavaScript e sugira melhorias: [seu código]"
```

### Exemplo 2: Geração de Documentação
```bash
mangaba task --provider anthropic
# Tarefa: "Crie documentação para esta API REST: [especificação]"
```

### Exemplo 3: Resolução de Problemas
```bash
mangaba task --provider ollama --model llama2
# Tarefa: "Como resolver erro de CORS em aplicação React?"
```

## 🔧 Configuração Avançada

### Personalização com GEMINI.md

Crie um arquivo `GEMINI.md` na raiz do seu projeto para definir regras específicas:

```markdown
# Configuração do Projeto

## Regras de Código
- Use TypeScript para novos arquivos
- Prefira async/await ao invés de promises
- Mantenha funções com máximo 50 linhas

## Ferramentas Preferidas
- Provider padrão: OpenAI
- Modelo padrão: gpt-4
- Estilo de resposta: técnico e conciso

## Diretórios a Ignorar
- node_modules/
- dist/
- .git/
```

### Variáveis de Ambiente

Você pode usar variáveis de ambiente ao invés da configuração interativa:

```bash
# OpenAI
export OPENAI_API_KEY="sua-chave-aqui"
export OPENAI_DEFAULT_MODEL="gpt-4"

# Google Gemini
export GEMINI_API_KEY="sua-chave-aqui"
export GEMINI_DEFAULT_MODEL="gemini-pro"

# Anthropic
export ANTHROPIC_API_KEY="sua-chave-aqui"
export ANTHROPIC_DEFAULT_MODEL="claude-3-sonnet-20240229"

# Ollama
export OLLAMA_BASE_URL="http://localhost:11434"
export OLLAMA_DEFAULT_MODEL="llama2"
```

### Localização dos Arquivos
As configurações são salvas em:
- **Windows**: `%USERPROFILE%\.mangaba\config.json`
- **macOS/Linux**: `~/.mangaba/config.json`

### Estrutura da Configuração
```json
{
  "openai": {
    "apiKey": "sk-...",
    "defaultModel": "gpt-4",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "gemini": {
    "apiKey": "AI...",
    "defaultModel": "gemini-pro",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🛠️ Desenvolvimento

### Estrutura do Projeto
```
src/
├── cli.js              # Ponto de entrada do CLI
├── agent.js            # Agente principal de IA
├── config.js           # Gerenciador de configurações
└── providers/          # Provedores de IA
    ├── openai.js       # Provedor OpenAI
    ├── gemini.js       # Provedor Google Gemini
    ├── anthropic.js    # Provedor Anthropic
    └── ollama.js       # Provedor Ollama
```

### Executar em Modo de Desenvolvimento
```bash
node src/cli.js config
node src/cli.js task
```

## 🔒 Segurança

- ✅ API Keys são armazenadas localmente
- ✅ Não há transmissão de credenciais para serviços externos
- ✅ Suporte a modelos locais via Ollama para máxima privacidade
- ✅ Configurações protegidas no diretório do usuário

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se encontrar problemas:

1. Verifique se suas API Keys estão corretas
2. Para Ollama, certifique-se de que está rodando (`ollama serve`)
3. Verifique sua conexão com a internet
4. Consulte os logs de erro para mais detalhes

---

**Feito com ❤️ para a comunidade de desenvolvedores**#
