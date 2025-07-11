# Configuração do Mangaba CLI Agent

Este arquivo define as regras e configurações específicas para o agente de IA Mangaba CLI.

## Regras Gerais

### Estilo de Código
- Use JavaScript ES6+ com sintaxe moderna
- Prefira `const` e `let` ao invés de `var`
- Use arrow functions quando apropriado
- Mantenha funções pequenas e focadas (máximo 50 linhas)
- Use nomes descritivos para variáveis e funções
- Adicione comentários JSDoc para funções públicas

### Estrutura de Arquivos
- Mantenha a estrutura modular existente
- Coloque utilitários em `src/tools/`
- Providers de LLM em `src/providers/`
- Configurações em `src/config.js`
- Contexto e memória em `src/context.js`

### Tratamento de Erros
- Sempre use try-catch para operações assíncronas
- Forneça mensagens de erro claras e acionáveis
- Log erros para debugging quando necessário
- Implemente fallbacks quando possível

## Ferramentas Disponíveis

### Busca de Arquivos
- Use `FileSearcher` para localizar arquivos por padrão
- Suporte para busca por conteúdo usando regex
- Filtros por tipo de arquivo e tamanho
- Exclusão de diretórios como `node_modules`, `.git`

### Busca Web
- Use `WebSearcher` para pesquisas na internet
- Suporte para DuckDuckGo como motor principal
- Fallback para busca simulada quando APIs falham
- Capacidade de buscar conteúdo de URLs específicas

### Execução de Comandos Shell
- Prefixe comandos com `!` para execução direta
- Forneça explicações sobre o que cada comando faz
- Valide comandos antes da execução
- Capture e analise a saída dos comandos

### Gerenciamento de Contexto
- Use `ContextManager` para manter histórico de conversas
- Salve preferências do usuário
- Mantenha contexto do projeto atual
- Permita importação/exportação de contexto

## Providers de LLM

### OpenAI
- Modelos suportados: gpt-4, gpt-3.5-turbo, gpt-4-turbo
- Use gpt-4 para tarefas complexas
- Use gpt-3.5-turbo para tarefas simples e rápidas

### Google Gemini
- Modelos suportados: gemini-pro, gemini-pro-vision
- Excelente para análise de código e documentação
- Suporte nativo para múltiplas linguagens

### Anthropic Claude
- Modelos suportados: claude-3-opus, claude-3-sonnet, claude-3-haiku
- Ótimo para análise detalhada e explicações
- Forte em raciocínio e lógica

### Ollama (Local)
- Suporte para modelos locais
- Ideal para privacidade e uso offline
- Configuração flexível de modelos

## Comandos Específicos

### `mangaba task`
- Aceita entrada via stdin ou argumentos
- Suporte para análise de arquivos com `-f`
- Execução de comandos shell com `-s`
- Seleção automática do melhor provider/modelo

### `mangaba search`
- Busca inteligente em arquivos do projeto
- Suporte para padrões glob e regex
- Filtros avançados por tipo e tamanho

### `mangaba web`
- Pesquisa na internet com resultados estruturados
- Análise de conteúdo de URLs
- Busca de notícias e imagens

### `mangaba code`
- Análise estática de código
- Sugestões de refatoração
- Detecção de problemas e melhorias
- Geração de documentação

### `mangaba memory`
- Gerenciamento de contexto persistente
- Comandos: add, get, clear, search, export, import
- Armazenamento local seguro

## Segurança

### API Keys
- Nunca exponha chaves de API em logs
- Use variáveis de ambiente quando possível
- Armazene configurações de forma segura
- Valide permissões antes de operações sensíveis

### Execução de Comandos
- Valide comandos antes da execução
- Evite comandos potencialmente perigosos
- Confirme com o usuário para operações destrutivas
- Use timeouts para evitar travamentos

## Personalização

### Preferências do Usuário
- Provider/modelo padrão
- Estilo de saída (verbose, conciso, técnico)
- Linguagem de resposta
- Configurações de busca

### Configuração do Projeto
- Diretórios a ignorar na busca
- Extensões de arquivo preferidas
- Regras específicas de código
- Integrações personalizadas

## Exemplos de Uso

```bash
# Análise de arquivo específico
mangaba task -f src/cli.js "Explique este código"

# Execução de comando com explicação
mangaba task -s "npm test" "Execute os testes e explique os resultados"

# Busca em arquivos
mangaba search "função de configuração" --type js

# Pesquisa web
mangaba web "melhores práticas Node.js 2024"

# Análise de código
mangaba code src/ --refactor --docs

# Gerenciamento de memória
mangaba memory add "Preferência: usar async/await ao invés de promises"
```

## Integração com IDEs

### VS Code
- Suporte para extensão futura
- Integração com terminal integrado
- Comandos via palette

### Terminal
- Autocompletar para comandos
- Histórico de comandos
- Saída colorizada

## Roadmap

### Próximas Funcionalidades
- [ ] Suporte para MCP (Model Context Protocol)
- [ ] Plugin system para extensões
- [ ] Interface web opcional
- [ ] Integração com Git
- [ ] Análise de performance
- [ ] Suporte para mais providers
- [ ] Templates de projeto
- [ ] Modo colaborativo

### Melhorias Planejadas
- [ ] Cache inteligente de respostas
- [ ] Otimização de tokens
- [ ] Métricas de uso
- [ ] Backup automático de contexto
- [ ] Sincronização entre dispositivos

---

*Este arquivo deve ser atualizado conforme o projeto evolui. Contribuições são bem-vindas!*