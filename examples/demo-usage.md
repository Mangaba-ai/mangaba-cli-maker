# Demonstração do Mangaba CLI

Este documento demonstra as principais funcionalidades do Mangaba CLI inspiradas no Gemini CLI.

## 🚀 Configuração Inicial

```bash
# 1. Instalar dependências
npm install

# 2. Configurar pelo menos um provedor de IA
node src/cli.js config

# 3. Verificar configuração
node src/cli.js list
```

## 📝 Exemplos Práticos

### 1. Análise de Código

```bash
# Analisar um arquivo específico
node src/cli.js task -f src/cli.js "Explique a estrutura deste arquivo CLI"

# Análise completa de código com sugestões
node src/cli.js code src/ --analyze

# Refatoração com documentação
node src/cli.js code src/agent.js --refactor --docs
```

### 2. Busca Inteligente

```bash
# Buscar arquivos JavaScript
node src/cli.js search "*.js" --type file

# Buscar por conteúdo usando regex
node src/cli.js search "class.*Agent" --regex --dir src/

# Buscar arquivos por tamanho
node src/cli.js search "*.json" --size ">1KB" --type file
```

### 3. Execução de Comandos Shell

```bash
# Executar comando com explicação
node src/cli.js task -s "npm list --depth=0" "Liste as dependências e explique cada uma"

# Comando shell direto com IA
node src/cli.js shell "dir /s *.js" --explain
```

### 4. Pesquisa Web

```bash
# Pesquisa básica na web
node src/cli.js web "Node.js CLI best practices 2024" --max 3

# Analisar conteúdo de URL específica
node src/cli.js web --url "https://nodejs.org/api/cli.html" --analyze

# Buscar notícias sobre tecnologia
node src/cli.js web "JavaScript frameworks 2024" --news --max 5
```

### 5. Gerenciamento de Contexto

```bash
# Adicionar informação ao contexto
node src/cli.js memory add "Projeto: CLI de IA agnóstico"
node src/cli.js memory add "Preferência: usar async/await"
node src/cli.js memory add "Estilo: código limpo e bem documentado"

# Buscar no contexto
node src/cli.js memory search "preferência"

# Ver todo o contexto
node src/cli.js memory get

# Exportar contexto
node src/cli.js memory export backup-context.json

# Limpar contexto
node src/cli.js memory clear
```

### 6. Estatísticas e Ferramentas

```bash
# Ver estatísticas de uso
node src/cli.js stats

# Descobrir ferramentas disponíveis
node src/cli.js tools
```

## 🎯 Casos de Uso Avançados

### Desenvolvimento de Software

```bash
# 1. Analisar estrutura do projeto
node src/cli.js task "Analise a estrutura deste projeto e sugira melhorias"

# 2. Gerar documentação
node src/cli.js code README.md --docs

# 3. Revisar código
node src/cli.js task -f src/agent.js "Revise este código e sugira otimizações"

# 4. Debugar problemas
node src/cli.js task -s "npm test" "Execute os testes e analise falhas"
```

### Pesquisa e Aprendizado

```bash
# 1. Pesquisar melhores práticas
node src/cli.js web "Node.js error handling best practices" --max 5

# 2. Comparar tecnologias
node src/cli.js task "Compare Express.js vs Fastify vs Koa.js"

# 3. Aprender novos conceitos
node src/cli.js task "Explique o padrão Observer em JavaScript com exemplos"
```

### Automação de Tarefas

```bash
# 1. Gerar scripts de build
node src/cli.js task "Crie um script de build para este projeto Node.js"

# 2. Configurar CI/CD
node src/cli.js task "Gere um arquivo GitHub Actions para CI/CD"

# 3. Criar testes
node src/cli.js task -f src/config.js "Gere testes unitários para este módulo"
```

## 🔧 Personalização Avançada

### Arquivo GEMINI.md

Crie um arquivo `GEMINI.md` na raiz do projeto:

```markdown
# Configuração do Mangaba CLI

## Regras de Código
- Use JavaScript ES6+ moderno
- Prefira const/let ao invés de var
- Funções devem ter máximo 50 linhas
- Use JSDoc para documentação

## Preferências
- Provider padrão: OpenAI
- Modelo padrão: gpt-4
- Estilo de resposta: técnico e detalhado
- Linguagem: Português brasileiro

## Diretórios a Ignorar
- node_modules/
- .git/
- dist/
- coverage/
```

### Configuração de Ambiente

```bash
# Arquivo .env (opcional)
OPENAI_API_KEY=sua_chave_openai
OPENAI_DEFAULT_MODEL=gpt-4
GEMINI_API_KEY=sua_chave_gemini
ANTHROPIC_API_KEY=sua_chave_anthropic
OLLAMA_BASE_URL=http://localhost:11434
```

## 🎨 Fluxos de Trabalho

### Fluxo de Desenvolvimento

1. **Análise inicial**
   ```bash
   node src/cli.js task "Analise este projeto e identifique áreas de melhoria"
   ```

2. **Implementação**
   ```bash
   node src/cli.js task -f src/nova-feature.js "Implemente esta funcionalidade"
   ```

3. **Testes**
   ```bash
   node src/cli.js task -s "npm test" "Execute testes e analise resultados"
   ```

4. **Documentação**
   ```bash
   node src/cli.js code src/ --docs
   ```

### Fluxo de Pesquisa

1. **Pesquisa web**
   ```bash
   node src/cli.js web "tópico de interesse" --max 5
   ```

2. **Análise de conteúdo**
   ```bash
   node src/cli.js web --url "https://artigo-interessante.com" --analyze
   ```

3. **Salvar contexto**
   ```bash
   node src/cli.js memory add "Aprendizado: conceito importante"
   ```

## 🚨 Dicas e Truques

### Otimização de Performance

- Use modelos menores (gpt-3.5-turbo) para tarefas simples
- Configure Ollama para uso offline
- Use cache de contexto para conversas longas

### Segurança

- Nunca commite arquivos de configuração com API keys
- Use variáveis de ambiente em produção
- Revise comandos shell antes da execução

### Produtividade

- Crie aliases para comandos frequentes
- Use o arquivo GEMINI.md para consistência
- Mantenha contexto organizado com tags

## 📚 Recursos Adicionais

- [Documentação completa](../README.md)
- [Configuração GEMINI.md](../GEMINI.md)
- [Exemplos de código](../examples/)
- [Testes](../test-expanded-cli.js)

---

*Este documento é atualizado conforme novas funcionalidades são adicionadas ao Mangaba CLI.*