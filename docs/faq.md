# ❓ Perguntas Frequentes (FAQ)

## Índice

- [Instalação e Configuração](#instalação-e-configuração)
- [Uso Básico](#uso-básico)
- [Providers de IA](#providers-de-ia)
- [Problemas Comuns](#problemas-comuns)
- [Performance e Otimização](#performance-e-otimização)
- [Segurança e Privacidade](#segurança-e-privacidade)
- [Desenvolvimento e Contribuição](#desenvolvimento-e-contribuição)
- [Comparações](#comparações)
- [Licenciamento](#licenciamento)

---

## 📦 Instalação e Configuração

### P: Como instalo o Mangaba CLI?

**R:** Existem várias formas de instalar:

```bash
# Instalação global (recomendado)
npm install -g mangaba-cli

# Usando npx (sem instalação)
npx mangaba-cli --help

# Clonando o repositório
git clone https://github.com/usuario/mangaba-cli.git
cd mangaba-cli
npm install
npm link
```

### P: Quais são os requisitos mínimos do sistema?

**R:** 
- **Node.js**: 16.0.0 ou superior
- **npm**: 7.0.0 ou superior
- **RAM**: 4GB recomendado
- **Espaço**: 500MB livres
- **SO**: Windows, macOS, ou Linux

### P: Como configuro minha primeira API key?

**R:** 
```bash
# Configurar OpenAI (exemplo)
mangaba config set provider openai
mangaba config set openai.apiKey "sua-api-key-aqui"
mangaba config set openai.model "gpt-4"

# Testar configuração
mangaba test connection
```

### P: Posso usar múltiplos providers ao mesmo tempo?

**R:** Sim! Você pode configurar múltiplos providers e alternar entre eles:

```bash
# Configurar múltiplos providers
mangaba config set openai.apiKey "sk-..."
mangaba config set gemini.apiKey "AIza..."
mangaba config set anthropic.apiKey "sk-ant-..."

# Usar provider específico
mangaba task "Analise este código" --provider gemini
```

### P: Como faço backup das minhas configurações?

**R:** 
```bash
# Exportar configurações
mangaba config export > backup-config.json

# Restaurar configurações
mangaba config import backup-config.json
```

---

## 🚀 Uso Básico

### P: Qual é a diferença entre `task` e `code`?

**R:** 
- **`task`**: Comando geral para qualquer tarefa com IA
- **`code`**: Comando especializado para análise e manipulação de código

```bash
# task - uso geral
mangaba task "Explique como funciona async/await"
mangaba task "Crie um README para este projeto"

# code - específico para código
mangaba code app.js --analyze
mangaba code utils.js --refactor
```

### P: Como posso salvar os resultados em arquivos?

**R:** Use a opção `--output`:

```bash
# Salvar resultado em arquivo
mangaba task "Crie documentação" --output README.md
mangaba code app.js --test --output tests/app.test.js
```

### P: Como adiciono contexto às minhas consultas?

**R:** 
```bash
# Adicionar contexto manualmente
mangaba context add "Este é um projeto React com TypeScript"

# Adicionar arquivo ao contexto
mangaba context add-file package.json

# Usar contexto em tarefa
mangaba task "Crie testes" --context "projeto Node.js com Jest"
```

### P: Posso usar o CLI em scripts automatizados?

**R:** Sim! O CLI é perfeito para automação:

```bash
#!/bin/bash
# Script de análise automática
mangaba code . --analyze --report > analysis.md
mangaba task "Gere relatório de qualidade" --output quality-report.md
```

---

## 🤖 Providers de IA

### P: Qual provider devo escolher?

**R:** Depende das suas necessidades:

| Provider | Melhor Para | Custo | Velocidade |
|----------|-------------|-------|------------|
| **OpenAI** | Qualidade geral, código | $$$ | Médio |
| **Gemini** | Análise de texto, gratuito | $ | Rápido |
| **Claude** | Análise detalhada, segurança | $$$ | Médio |
| **Ollama** | Privacidade, offline | Grátis | Lento |
| **Groq** | Velocidade extrema | $$ | Muito Rápido |
| **Cohere** | Processamento de linguagem | $$ | Rápido |

### P: Como uso modelos locais com Ollama?

**R:** 
```bash
# Instalar Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Baixar modelo
ollama pull llama2
ollama pull codellama

# Configurar no Mangaba
mangaba config set provider ollama
mangaba config set ollama.baseUrl "http://localhost:11434"
mangaba config set ollama.model "llama2"
```

### P: Qual a diferença entre os modelos do OpenAI?

**R:** 
- **GPT-4**: Mais inteligente, melhor para tarefas complexas
- **GPT-4 Turbo**: Mais rápido que GPT-4, contexto maior
- **GPT-3.5 Turbo**: Mais barato, bom para tarefas simples
- **GPT-3.5 Turbo 16k**: Contexto estendido

### P: Como otimizo o uso de tokens para reduzir custos?

**R:** 
```bash
# Configurar limites de tokens
mangaba config set openai.maxTokens 1024

# Usar modelos mais baratos para tarefas simples
mangaba config set openai.model "gpt-3.5-turbo"

# Ser específico nas consultas
mangaba task "Refatore apenas a função login" # ✅ Específico
mangaba task "Melhore todo o código" # ❌ Muito amplo
```

---

## 🔧 Problemas Comuns

### P: "mangaba: command not found" - Como resolver?

**R:** 
```bash
# Verificar se está instalado globalmente
npm list -g mangaba-cli

# Reinstalar se necessário
npm uninstall -g mangaba-cli
npm install -g mangaba-cli

# Verificar PATH
echo $PATH

# Usar npx como alternativa
npx mangaba-cli --help
```

### P: "API key inválida" - O que fazer?

**R:** 
```bash
# Verificar configuração atual
mangaba config get openai.apiKey

# Reconfigurar API key
mangaba config set openai.apiKey "nova-api-key"

# Testar conexão
mangaba test connection --provider openai

# Verificar se a key tem permissões adequadas
```

### P: O CLI está muito lento - Como acelerar?

**R:** 
1. **Trocar para provider mais rápido**:
```bash
mangaba config set provider groq
```

2. **Reduzir tokens**:
```bash
mangaba config set groq.maxTokens 1024
```

3. **Usar cache**:
```bash
mangaba config set global.cache true
```

4. **Ser mais específico nas consultas**

### P: "Rate limit exceeded" - Como resolver?

**R:** 
```bash
# Aguardar alguns minutos e tentar novamente
# Ou trocar para outro provider temporariamente
mangaba config set provider gemini

# Configurar retry automático
mangaba config set global.retries 3
mangaba config set global.retryDelay 5000
```

### P: Como resolver problemas de encoding/caracteres especiais?

**R:** 
```bash
# No Windows, usar UTF-8
chcp 65001

# Configurar encoding no terminal
export LANG=en_US.UTF-8

# Usar aspas para textos com acentos
mangaba task "Analise esta função em português"
```

---

## ⚡ Performance e Otimização

### P: Como posso melhorar a velocidade das respostas?

**R:** 
1. **Use providers mais rápidos** (Groq, Gemini)
2. **Reduza max_tokens**
3. **Seja específico nas consultas**
4. **Use cache quando disponível**
5. **Configure timeout adequado**

```bash
# Configuração otimizada para velocidade
mangaba config set provider groq
mangaba config set groq.maxTokens 1024
mangaba config set global.timeout 15000
```

### P: Como reduzir o uso de memória?

**R:** 
```bash
# Limpar cache regularmente
mangaba cache clear

# Reduzir contexto
mangaba context clear

# Processar arquivos menores por vez
mangaba code src/utils.js --analyze  # ✅ Arquivo específico
mangaba code src/ --analyze          # ❌ Diretório inteiro
```

### P: Posso usar o CLI offline?

**R:** Parcialmente, apenas com Ollama:

```bash
# Configurar Ollama para uso offline
mangaba config set provider ollama
mangaba config set ollama.baseUrl "http://localhost:11434"

# Baixar modelos antecipadamente
ollama pull llama2
ollama pull codellama
```

---

## 🔒 Segurança e Privacidade

### P: Minhas API keys estão seguras?

**R:** Sim, seguimos boas práticas:
- Keys armazenadas localmente
- Nunca enviadas para nossos servidores
- Criptografadas no arquivo de configuração
- Não aparecem em logs

### P: Meu código é enviado para onde?

**R:** Apenas para o provider de IA que você configurou:
- **OpenAI**: Servidores da OpenAI
- **Gemini**: Servidores do Google
- **Ollama**: Apenas local (não sai da sua máquina)
- **LocalAI**: Apenas local

### P: Como usar o CLI em projetos confidenciais?

**R:** 
1. **Use Ollama ou LocalAI** (processamento local)
2. **Configure .gitignore** para não commitar configs
3. **Use variáveis de ambiente** para API keys
4. **Revise código** antes de enviar para IA

```bash
# Configuração segura
echo ".env" >> .gitignore
echo "mangaba.config.json" >> .gitignore

# Usar variáveis de ambiente
export OPENAI_API_KEY="sua-key"
mangaba task "Analise código"
```

### P: Posso auditar o que é enviado para a IA?

**R:** Sim:

```bash
# Ativar logs detalhados
mangaba config set global.debug true

# Ver logs
mangaba logs show --level debug

# Modo dry-run (simular sem enviar)
mangaba task "teste" --dry-run
```

---

## 👨‍💻 Desenvolvimento e Contribuição

### P: Como posso contribuir com o projeto?

**R:** Várias formas:
1. **Reportar bugs** no GitHub
2. **Sugerir features** via issues
3. **Contribuir código** via pull requests
4. **Melhorar documentação**
5. **Ajudar outros usuários** nas discussões

Veja o [Guia de Contribuição](contributing.md) para detalhes.

### P: Como adiciono um novo provider?

**R:** 
1. Crie arquivo em `src/providers/novo-provider.js`
2. Implemente interface padrão
3. Adicione ao `src/agent.js`
4. Atualize configuração em `src/config.js`
5. Adicione testes
6. Atualize documentação

Veja exemplos nos providers existentes.

### P: Como reporto um bug?

**R:** 
1. Verifique se já não foi reportado
2. Use o template de bug report
3. Inclua informações do ambiente
4. Forneça passos para reproduzir
5. Adicione logs se possível

### P: Posso criar plugins para o CLI?

**R:** Atualmente não há sistema de plugins, mas está no roadmap para v2.1.0. Por enquanto, você pode:
- Criar scripts que usam o CLI
- Contribuir com novas funcionalidades
- Usar o CLI como dependência em seus projetos

---

## 🔄 Comparações

### P: Qual a diferença entre Mangaba CLI e ChatGPT?

**R:** 
| Aspecto | Mangaba CLI | ChatGPT |
|---------|-------------|----------|
| **Interface** | Terminal/CLI | Web/App |
| **Foco** | Desenvolvimento | Uso geral |
| **Providers** | 9 diferentes | Apenas OpenAI |
| **Automação** | Scripts/CI/CD | Manual |
| **Contexto** | Arquivos/projetos | Conversa |
| **Offline** | Sim (Ollama) | Não |

### P: Por que não usar diretamente as APIs dos providers?

**R:** O Mangaba CLI oferece:
- **Interface unificada** para múltiplos providers
- **Comandos especializados** para desenvolvimento
- **Gerenciamento de contexto** automático
- **Integração com ferramentas** de desenvolvimento
- **Configuração simplificada**
- **Automação** via scripts

### P: Como se compara com GitHub Copilot?

**R:** 
| Aspecto | Mangaba CLI | GitHub Copilot |
|---------|-------------|----------------|
| **Escopo** | CLI/Terminal | IDE |
| **Funcionalidade** | Análise, refatoração, docs | Autocompletar |
| **Providers** | Múltiplos | OpenAI |
| **Custo** | Varia por provider | $10/mês |
| **Flexibilidade** | Alta | Limitada |

---

## 📄 Licenciamento

### P: Qual é a licença do Mangaba CLI?

**R:** MIT License - você pode usar, modificar e distribuir livremente, inclusive para uso comercial.

### P: Posso usar em projetos comerciais?

**R:** Sim! A licença MIT permite uso comercial sem restrições.

### P: Preciso dar créditos ao usar?

**R:** Não é obrigatório, mas é apreciado! Você pode:
- Mencionar no README do seu projeto
- Dar uma ⭐ no GitHub
- Compartilhar com outros desenvolvedores

### P: Posso vender produtos baseados no Mangaba CLI?

**R:** Sim, a licença MIT permite isso. Apenas mantenha o aviso de copyright original.

---

## 🆘 Suporte

### P: Onde posso obter ajuda?

**R:** 
1. **Documentação**: Leia os guias em `/docs`
2. **FAQ**: Este documento
3. **GitHub Issues**: Para bugs e features
4. **GitHub Discussions**: Para dúvidas gerais
5. **Discord**: Chat em tempo real (link no README)

### P: Como posso ajudar outros usuários?

**R:** 
- Responda perguntas no GitHub Discussions
- Ajude no Discord
- Melhore a documentação
- Compartilhe suas experiências
- Crie tutoriais e exemplos

### P: Há suporte comercial disponível?

**R:** Atualmente não oferecemos suporte comercial oficial, mas você pode:
- Contratar desenvolvedores da comunidade
- Patrocinar o projeto para priorizar features
- Contribuir com desenvolvimento

---

## 🔮 Futuro do Projeto

### P: Qual é o roadmap do projeto?

**R:** Principais marcos:
- **v2.1**: Sistema de plugins
- **v2.2**: Integração com IDEs
- **v3.0**: Interface web e colaboração

Veja o roadmap completo no [GitHub](link-roadmap).

### P: Como posso influenciar o desenvolvimento?

**R:** 
- Vote em features no GitHub
- Participe das discussões
- Contribua com código
- Patrocine o projeto
- Sugira novas ideias

### P: O projeto será sempre gratuito?

**R:** Sim! O core do Mangaba CLI sempre será open source e gratuito. Podemos adicionar serviços premium no futuro, mas a funcionalidade básica permanecerá livre.

---

## 📊 Estatísticas e Métricas

### P: Quantas pessoas usam o Mangaba CLI?

**R:** Você pode ver estatísticas atualizadas:
- **npm downloads**: [link npm]
- **GitHub stars**: [link GitHub]
- **Contributors**: [link contributors]

### P: Qual provider é mais popular?

**R:** Baseado em telemetria anônima (opt-in):
1. OpenAI (45%)
2. Gemini (25%)
3. Ollama (15%)
4. Claude (10%)
5. Outros (5%)

---

**💡 Não encontrou sua pergunta?**

- Abra uma [issue no GitHub](link-issues)
- Participe das [discussões](link-discussions)
- Entre no nosso [Discord](link-discord)

**🔗 Links Úteis:**
- [Documentação Completa](README.md)
- [Guia de Instalação](installation.md)
- [Exemplos Práticos](examples.md)
- [Referência da API](api-reference.md)
- [Guia de Contribuição](contributing.md)