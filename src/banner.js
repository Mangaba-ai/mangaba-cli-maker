const chalk = require('chalk');

class Banner {
  static show() {
    console.clear();
    
    // Arte ASCII do Mangaba CLI com cores da fruta mangaba (amarelo, laranja, vermelho)
    const banner = `
${chalk.yellow('███╗   ███╗')}${chalk.hex('#FFA500')('█████╗ ')}${chalk.hex('#FF6347')('███╗   ██╗')}${chalk.red('██████╗ ')}${chalk.yellow('█████╗ ')}${chalk.hex('#FF8C00')('██████╗ ')}${chalk.hex('#FFD700')('█████╗ ')}
${chalk.yellow('████╗ ████║')}${chalk.hex('#FFA500')('██╔══██╗')}${chalk.hex('#FF6347')('████╗  ██║')}${chalk.red('██╔════╝ ')}${chalk.yellow('██╔══██╗')}${chalk.hex('#FF8C00')('██╔══██╗')}${chalk.hex('#FFD700')('██╔══██╗')}
${chalk.yellow('██╔████╔██║')}${chalk.hex('#FFA500')('███████║')}${chalk.hex('#FF6347')('██╔██╗ ██║')}${chalk.red('██║  ███╗')}${chalk.yellow('███████║')}${chalk.hex('#FF8C00')('██████╔╝')}${chalk.hex('#FFD700')('███████║')}
${chalk.yellow('██║╚██╔╝██║')}${chalk.hex('#FFA500')('██╔══██║')}${chalk.hex('#FF6347')('██║╚██╗██║')}${chalk.red('██║   ██║')}${chalk.yellow('██╔══██║')}${chalk.hex('#FF8C00')('██╔══██╗')}${chalk.hex('#FFD700')('██╔══██║')}
${chalk.yellow('██║ ╚═╝ ██║')}${chalk.hex('#FFA500')('██║  ██║')}${chalk.hex('#FF6347')('██║ ╚████║')}${chalk.red('╚██████╔╝')}${chalk.yellow('██║  ██║')}${chalk.hex('#FF8C00')('██████╔╝')}${chalk.hex('#FFD700')('██║  ██║')}
${chalk.yellow('╚═╝     ╚═╝')}${chalk.hex('#FFA500')('╚═╝  ╚═╝')}${chalk.hex('#FF6347')('╚═╝  ╚═══╝')}${chalk.red(' ╚═════╝ ')}${chalk.yellow('╚═╝  ╚═╝')}${chalk.hex('#FF8C00')('╚═════╝ ')}${chalk.hex('#FFD700')('╚═╝  ╚═╝')}
`;
    
    console.log(banner);
    
    // Subtítulo com descrição
    console.log(chalk.hex('#FF8C00')('                    🥭 Agente CLI de IA Agnóstico'));
    console.log(chalk.hex('#FFA500')('        Powered by OpenAI • Gemini • Claude • Ollama • HuggingFace • Cohere • Together • LocalAI • Groq'));
    console.log();
    
    // Linha decorativa
    console.log(chalk.dim('─'.repeat(80)));
    console.log();
  }
  
  static showWelcome() {
    this.show();
    
    // Dicas de uso
    console.log(chalk.bold.white('💡 Dicas para começar:'));
    console.log(chalk.cyan('1. ') + chalk.white('Configure uma API: ') + chalk.yellow('mangaba config'));
    console.log(chalk.cyan('2. ') + chalk.white('Execute uma tarefa: ') + chalk.yellow('mangaba task "sua pergunta"'));
    console.log(chalk.cyan('3. ') + chalk.white('Busque arquivos: ') + chalk.yellow('mangaba search "*.js"'));
    console.log(chalk.cyan('4. ') + chalk.white('Analise código: ') + chalk.yellow('mangaba code arquivo.js'));
    console.log(chalk.cyan('5. ') + chalk.white('Pesquise na web: ') + chalk.yellow('mangaba web "Node.js tips"'));
    console.log();
    
    // Comandos disponíveis
    console.log(chalk.bold.white('🛠️  Comandos disponíveis:'));
    const commands = [
      { cmd: 'config', desc: 'Configurar APIs de LLM' },
      { cmd: 'task', desc: 'Executar tarefas com IA' },
      { cmd: 'search', desc: 'Buscar arquivos e conteúdo' },
      { cmd: 'code', desc: 'Analisar e refatorar código' },
      { cmd: 'web', desc: 'Pesquisar na internet' },
      { cmd: 'memory', desc: 'Gerenciar contexto' },
      { cmd: 'shell', desc: 'Executar comandos shell' },
      { cmd: 'stats', desc: 'Ver estatísticas' },
      { cmd: 'tools', desc: 'Descobrir ferramentas' }
    ];
    
    commands.forEach(({ cmd, desc }) => {
      console.log(chalk.green(`  ${cmd.padEnd(8)}`) + chalk.gray(desc));
    });
    
    console.log();
    console.log(chalk.dim('─'.repeat(80)));
    console.log(chalk.gray('💡 Use ') + chalk.yellow('mangaba --help') + chalk.gray(' para mais informações'));
    console.log();
  }
  
  static showQuickStart() {
    this.show();
    
    console.log(chalk.bold.white('🚀 Início Rápido:'));
    console.log();
    
    console.log(chalk.cyan('1. Configuração Inicial'));
    console.log(chalk.gray('   Configure pelo menos um provedor de IA:'));
    console.log(chalk.yellow('   $ mangaba config'));
    console.log();
    
    console.log(chalk.cyan('2. Primeira Tarefa'));
    console.log(chalk.gray('   Execute sua primeira tarefa:'));
    console.log(chalk.yellow('   $ mangaba task "Explique o que é Node.js"'));
    console.log();
    
    console.log(chalk.cyan('3. Análise de Código'));
    console.log(chalk.gray('   Analise um arquivo de código:'));
    console.log(chalk.yellow('   $ mangaba code src/cli.js --action analyze'));
    console.log();
    
    console.log(chalk.cyan('4. Busca Inteligente'));
    console.log(chalk.gray('   Encontre arquivos no projeto:'));
    console.log(chalk.yellow('   $ mangaba search "*.json" --type file'));
    console.log();
    
    console.log(chalk.cyan('5. Pesquisa Web'));
    console.log(chalk.gray('   Pesquise informações online:'));
    console.log(chalk.yellow('   $ mangaba web "JavaScript best practices 2024"'));
    console.log();
    
    console.log(chalk.dim('─'.repeat(80)));
    console.log(chalk.gray('📚 Documentação completa: ') + chalk.blue('README.md'));
    console.log(chalk.gray('🎯 Exemplos práticos: ') + chalk.blue('examples/demo-usage.md'));
    console.log();
  }
  
  static showProviders() {
    this.show();
    
    console.log(chalk.bold.white('🔌 Provedores de IA Suportados:'));
    console.log();
    
    const providers = [
      {
        name: 'OpenAI',
        icon: '🧠',
        models: ['gpt-4', 'gpt-3.5-turbo', 'gpt-4-turbo'],
        desc: 'Modelos GPT da OpenAI - Excelente para tarefas gerais'
      },
      {
        name: 'Google Gemini',
        icon: '💎',
        models: ['gemini-pro', 'gemini-pro-vision'],
        desc: 'Gemini do Google - Ótimo para análise e código'
      },
      {
        name: 'Anthropic Claude',
        icon: '🎭',
        models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
        desc: 'Claude da Anthropic - Forte em raciocínio e análise'
      },
      {
        name: 'Ollama',
        icon: '🏠',
        models: ['llama2', 'mistral', 'codellama'],
        desc: 'Modelos locais - Privacidade e uso offline'
      },
      {
        name: 'HuggingFace',
        icon: '🤗',
        models: ['microsoft/DialoGPT-large', 'facebook/blenderbot-400M'],
        desc: 'Hub de modelos open source - Diversidade e inovação'
      },
      {
        name: 'Cohere',
        icon: '🔮',
        models: ['command', 'command-light', 'command-nightly'],
        desc: 'Modelos Cohere - Especializado em texto e conversação'
      },
      {
        name: 'Together AI',
        icon: '🚀',
        models: ['llama-2-70b-chat', 'mistral-7b-instruct', 'codellama-34b'],
        desc: 'Plataforma com 50+ modelos open source otimizados'
      },
      {
        name: 'LocalAI',
        icon: '🔒',
        models: ['gpt-3.5-turbo', 'llama2', 'vicuna'],
        desc: 'Execute modelos localmente - Máxima privacidade'
      },
      {
        name: 'Groq',
        icon: '⚡',
        models: ['llama-3.1-70b', 'mixtral-8x7b', 'gemma-7b'],
        desc: 'Inferência ultra-rápida com hardware especializado'
      }
    ];
    
    providers.forEach(provider => {
      console.log(chalk.bold(`${provider.icon} ${provider.name}`));
      console.log(chalk.gray(`   ${provider.desc}`));
      console.log(chalk.cyan(`   Modelos: ${provider.models.join(', ')}`));
      console.log();
    });
    
    console.log(chalk.dim('─'.repeat(80)));
    console.log(chalk.gray('⚙️  Configure com: ') + chalk.yellow('mangaba config'));
    console.log(chalk.gray('📋 Veja configurados: ') + chalk.yellow('mangaba list'));
    console.log();
  }
  
  static showVersion(version = '1.0.0') {
    this.show();
    
    console.log(chalk.bold.white(`📦 Mangaba CLI v${version}`));
    console.log();
    
    console.log(chalk.gray('Desenvolvido com ❤️  para a comunidade de desenvolvedores'));
    console.log(chalk.gray('Licença: MIT'));
    console.log(chalk.gray('Repositório: https://github.com/seu-usuario/mangaba-cli'));
    console.log();
    
    console.log(chalk.bold.white('🔧 Tecnologias:'));
    console.log(chalk.cyan('• Node.js') + chalk.gray(' - Runtime JavaScript'));
    console.log(chalk.cyan('• Commander.js') + chalk.gray(' - Interface CLI'));
    console.log(chalk.cyan('• Inquirer.js') + chalk.gray(' - Prompts interativos'));
    console.log(chalk.cyan('• Chalk') + chalk.gray(' - Cores no terminal'));
    console.log(chalk.cyan('• Axios') + chalk.gray(' - Requisições HTTP'));
    console.log();
    
    console.log(chalk.dim('─'.repeat(80)));
    console.log(chalk.gray('🆕 Atualizações: ') + chalk.yellow('npm update -g mangaba-cli'));
    console.log();
  }
  
  static showError(message) {
    console.log();
    console.log(chalk.red('❌ Erro: ') + chalk.white(message));
    console.log();
    console.log(chalk.gray('💡 Dicas:'));
    console.log(chalk.gray('• Verifique se as APIs estão configuradas: ') + chalk.yellow('mangaba list'));
    console.log(chalk.gray('• Configure uma API: ') + chalk.yellow('mangaba config'));
    console.log(chalk.gray('• Veja a ajuda: ') + chalk.yellow('mangaba --help'));
    console.log();
  }
  
  static showSuccess(message) {
    console.log();
    console.log(chalk.green('✅ Sucesso: ') + chalk.white(message));
    console.log();
  }
  
  static showLoading(message = 'Processando...') {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    
    return setInterval(() => {
      process.stdout.write(`\r${chalk.cyan(frames[i])} ${chalk.white(message)}`);
      i = (i + 1) % frames.length;
    }, 100);
  }
  
  static stopLoading(interval) {
    clearInterval(interval);
    process.stdout.write('\r');
  }
}

module.exports = Banner;