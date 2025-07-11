# 📋 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Não Lançado]

### Adicionado
- Sistema de plugins (planejado para v2.1)
- Integração com IDEs (planejado para v2.2)
- Interface web (planejado para v3.0)

### Em Desenvolvimento
- Melhorias na performance de busca
- Cache inteligente para respostas
- Suporte a mais formatos de arquivo

---

## [2.0.0] - 2024-01-15

### 🎉 Adicionado
- **Novos Providers de IA:**
  - HuggingFace (transformers, inference API)
  - Cohere (command, embed models)
  - Together AI (open source models)
  - LocalAI (self-hosted)
  - Groq (ultra-fast inference)
- **Comandos Aprimorados:**
  - `mangaba providers` - Lista todos os providers disponíveis
  - `mangaba test` - Testa conexões e configurações
  - `mangaba stats` - Estatísticas de uso detalhadas
  - `mangaba tools` - Descobre ferramentas disponíveis
- **Funcionalidades:**
  - Suporte a múltiplos providers simultâneos
  - Configuração por projeto (mangaba.config.json)
  - Sistema de cache para respostas
  - Logs estruturados e configuráveis
  - Validação automática de configurações
  - Backup e restore de configurações
  - Modo dry-run para simulações
  - Suporte a templates personalizados

### 🔧 Melhorado
- **Performance:**
  - Busca de arquivos 3x mais rápida
  - Processamento paralelo de múltiplos arquivos
  - Cache inteligente reduz chamadas desnecessárias
- **Interface:**
  - Banner informativo com providers suportados
  - Mensagens de erro mais claras e acionáveis
  - Progress bars para operações longas
  - Cores e formatação melhoradas
- **Configuração:**
  - Wizard interativo para primeira configuração
  - Validação em tempo real de API keys
  - Sugestões automáticas de configuração
  - Migração automática de configs antigas

### 🐛 Corrigido
- Problema com encoding UTF-8 no Windows
- Memory leak em operações de busca grandes
- Timeout inadequado para modelos lentos
- Conflitos entre configurações globais e locais
- Escape incorreto de caracteres especiais
- Problemas de path em sistemas Unix

### 🔄 Alterado
- **BREAKING:** Estrutura de configuração reorganizada
- **BREAKING:** Alguns comandos renomeados para consistência
- Ollama agora usa endpoint padrão localhost:11434
- Logs movidos para diretório dedicado (~/.mangaba/logs)
- Configurações migradas para formato JSON mais limpo

### ⚠️ Depreciado
- Comando `mangaba analyze` (use `mangaba code --analyze`)
- Opção `--simple` (substituída por `--format simple`)
- Configuração via arquivo .env (migre para mangaba.config.json)

### 🗑️ Removido
- Suporte ao Node.js < 16
- Dependências desnecessárias (redução de 40% no tamanho)
- Comandos experimentais da v1.x

---

## [1.5.2] - 2023-12-10

### 🐛 Corrigido
- Problema crítico com API do Gemini
- Timeout em conexões lentas
- Encoding de caracteres especiais

### 🔧 Melhorado
- Tratamento de erros mais robusto
- Mensagens de log mais informativas

---

## [1.5.1] - 2023-11-28

### 🐛 Corrigido
- Vulnerabilidade de segurança em dependência
- Problema com paths relativos no Windows
- Memory leak em operações longas

### 🔧 Melhorado
- Performance da busca por regex
- Validação de entrada mais rigorosa

---

## [1.5.0] - 2023-11-15

### 🎉 Adicionado
- **Novo Provider:** Anthropic Claude
- **Comando:** `mangaba web` para busca e análise web
- **Funcionalidade:** Gerenciamento de contexto avançado
- **Opção:** `--format` para diferentes formatos de saída
- Suporte a arquivos de configuração por projeto
- Templates personalizáveis para comandos

### 🔧 Melhorado
- Interface do usuário mais intuitiva
- Performance geral 2x mais rápida
- Tratamento de erros mais informativo
- Documentação expandida com exemplos

### 🐛 Corrigido
- Problema com arquivos grandes (>1MB)
- Conflito entre configurações globais e locais
- Escape incorreto em comandos shell

---

## [1.4.3] - 2023-10-20

### 🐛 Corrigido
- Problema crítico com API do OpenAI
- Timeout em modelos Ollama grandes
- Encoding UTF-8 em sistemas Windows

---

## [1.4.2] - 2023-10-05

### 🔧 Melhorado
- Estabilidade das conexões de rede
- Tratamento de rate limits
- Logs mais detalhados para debug

### 🐛 Corrigido
- Memory leak em sessões longas
- Problema com paths contendo espaços
- Validação incorreta de API keys

---

## [1.4.1] - 2023-09-22

### 🐛 Corrigido
- Problema com instalação via npm
- Dependências em conflito
- Comando `mangaba config` não funcionando

---

## [1.4.0] - 2023-09-15

### 🎉 Adicionado
- **Novo Provider:** Ollama (modelos locais)
- **Comando:** `mangaba shell` para execução segura
- **Funcionalidade:** Sistema de logs estruturados
- Suporte a múltiplos formatos de arquivo
- Cache local para melhor performance

### 🔧 Melhorado
- Comando `mangaba search` mais poderoso
- Interface de configuração simplificada
- Documentação com mais exemplos práticos

### 🐛 Corrigido
- Problema com caracteres especiais
- Timeout inadequado para modelos grandes
- Conflitos de dependências

---

## [1.3.2] - 2023-08-30

### 🐛 Corrigido
- Vulnerabilidade de segurança (CVE-2023-XXXX)
- Problema com API do Google Gemini
- Memory usage excessivo

---

## [1.3.1] - 2023-08-15

### 🔧 Melhorado
- Performance da busca de arquivos
- Tratamento de erros de rede
- Validação de configurações

### 🐛 Corrigido
- Problema com encoding em arquivos não-UTF8
- Timeout em conexões lentas
- Escape incorreto de argumentos

---

## [1.3.0] - 2023-08-01

### 🎉 Adicionado
- **Novo Provider:** Google Gemini
- **Comando:** `mangaba context` para gerenciar contexto
- **Funcionalidade:** Busca semântica avançada
- Suporte a arquivos de configuração .env
- Templates para diferentes tipos de análise

### 🔧 Melhorado
- Comando `mangaba code` com mais opções
- Sistema de configuração mais flexível
- Mensagens de erro mais claras

### 🐛 Corrigido
- Problema com arquivos binários
- Conflito entre diferentes versões do Node.js
- Encoding incorreto em sistemas não-Unix

---

## [1.2.1] - 2023-07-20

### 🐛 Corrigido
- Problema crítico com comando `mangaba task`
- Memory leak em operações grandes
- Validação incorreta de API keys

---

## [1.2.0] - 2023-07-15

### 🎉 Adicionado
- **Comando:** `mangaba search` para busca inteligente
- **Funcionalidade:** Análise de múltiplos arquivos
- **Opção:** `--interactive` para modo interativo
- Suporte a regex em buscas
- Exportação de resultados em JSON/CSV

### 🔧 Melhorado
- Performance geral 50% mais rápida
- Interface mais responsiva
- Documentação expandida

### 🐛 Corrigido
- Problema com paths absolutos
- Timeout em operações longas
- Conflitos de configuração

---

## [1.1.2] - 2023-06-30

### 🐛 Corrigido
- Problema com instalação global
- Dependências em conflito
- Encoding em sistemas Windows

---

## [1.1.1] - 2023-06-25

### 🔧 Melhorado
- Estabilidade das conexões
- Tratamento de erros
- Performance da busca

### 🐛 Corrigido
- Memory usage excessivo
- Problema com arquivos grandes
- Validação de entrada

---

## [1.1.0] - 2023-06-20

### 🎉 Adicionado
- **Comando:** `mangaba code` para análise de código
- **Funcionalidade:** Refatoração automática
- **Opção:** `--output` para salvar resultados
- Suporte a múltiplos modelos OpenAI
- Sistema básico de configuração

### 🔧 Melhorado
- Comando `mangaba task` mais robusto
- Interface de linha de comando mais intuitiva
- Documentação inicial

### 🐛 Corrigido
- Problema com caracteres especiais
- Timeout inadequado
- Validação de API key

---

## [1.0.1] - 2023-06-10

### 🐛 Corrigido
- Problema crítico na instalação
- Dependências ausentes
- Comando `--help` não funcionando

---

## [1.0.0] - 2023-06-05

### 🎉 Lançamento Inicial

#### Funcionalidades Principais
- **Provider:** OpenAI GPT-3.5/GPT-4
- **Comando:** `mangaba task` para tarefas gerais
- **Funcionalidade:** Análise básica de código
- **Configuração:** Via linha de comando
- **Formatos:** Suporte a arquivos de texto

#### Comandos Disponíveis
- `mangaba task <prompt>` - Executa tarefa com IA
- `mangaba config set <key> <value>` - Configura parâmetros
- `mangaba config get <key>` - Visualiza configurações
- `mangaba --help` - Ajuda e documentação

#### Requisitos
- Node.js 14+
- npm 6+
- API key do OpenAI

---

## Tipos de Mudanças

- 🎉 **Adicionado** - para novas funcionalidades
- 🔧 **Melhorado** - para mudanças em funcionalidades existentes
- ⚠️ **Depreciado** - para funcionalidades que serão removidas
- 🗑️ **Removido** - para funcionalidades removidas
- 🐛 **Corrigido** - para correção de bugs
- 🔒 **Segurança** - para vulnerabilidades
- 🔄 **Alterado** - para mudanças que quebram compatibilidade

---

## Links e Referências

- [Semantic Versioning](https://semver.org/lang/pt-BR/)
- [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
- [Conventional Commits](https://www.conventionalcommits.org/pt-br/)
- [GitHub Releases](https://github.com/usuario/mangaba-cli/releases)
- [npm Package](https://www.npmjs.com/package/mangaba-cli)

---

## Processo de Release

### Versionamento
- **Major (X.0.0)**: Mudanças que quebram compatibilidade
- **Minor (0.X.0)**: Novas funcionalidades compatíveis
- **Patch (0.0.X)**: Correções de bugs compatíveis

### Cronograma
- **Major releases**: A cada 6-12 meses
- **Minor releases**: A cada 1-2 meses
- **Patch releases**: Conforme necessário
- **Hotfixes**: Imediatamente para problemas críticos

### Suporte
- **Versão atual**: Suporte completo
- **Versão anterior**: Correções críticas por 6 meses
- **Versões antigas**: Sem suporte ativo

---

**📝 Nota:** Este changelog é mantido manualmente. Para uma lista completa de commits, veja o [histórico do Git](https://github.com/usuario/mangaba-cli/commits/main).

**🔗 Links Úteis:**
- [Roadmap do Projeto](https://github.com/usuario/mangaba-cli/projects)
- [Issues Abertas](https://github.com/usuario/mangaba-cli/issues)
- [Discussões](https://github.com/usuario/mangaba-cli/discussions)
- [Releases](https://github.com/usuario/mangaba-cli/releases)