#!/usr/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const leven = require('leven');

const AIAgent = require('./agent');
const ConfigManager = require('./config');
const Banner = require('./banner');
const { version } = require('../package.json');

const program = new Command();
const configManager = new ConfigManager();

program
  .name('mangaba')
  .description('CLI AI Agent agnóstico para múltiplas APIs de LLMs')
  .version(version);

// Comando para configurar APIs
const configCommand = program
  .command('config')
  .description('Gerenciar configurações de APIs de LLMs');

configCommand
  .command('list')
  .description('Listar todas as configurações')
  .action(() => {
    configManager.displayConfig();
  });

configCommand
  .command('set')
  .description('Configurar um novo provider')
  .action(async () => {
    const { provider } = await inquirer.prompt([
      {
        type: 'list',
        name: 'provider',
        message: 'Selecione o provedor que deseja configurar:',
        choices: [
          { name: 'OpenAI (GPT-3.5, GPT-4)', value: 'openai' },
          { name: 'Google Gemini', value: 'gemini' },
          { name: 'Anthropic Claude', value: 'anthropic' },
          { name: 'Ollama (Local)', value: 'ollama' }
        ]
      }
    ]);
    await configureProvider(provider);
  });

configCommand
  .command('remove')
  .description('Remover a configuração de um provider')
  .action(async () => {
    const providers = configManager.listProviders();
    if (providers.length === 0) {
      console.log(chalk.yellow('Nenhuma configuração de provider para remover.'));
      return;
    }
    const { provider } = await inquirer.prompt([
      {
        type: 'list',
        name: 'provider',
        message: 'Selecione o provider para remover:',
        choices: providers
      }
    ]);
    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: `Tem certeza que deseja remover a configuração para ${chalk.red.bold(provider)}?`,
            default: false
        }
    ]);
    if (confirm) {
        configManager.removeProviderConfig(provider);
    }
  });

configCommand
  .command('clear')
  .description('Remover todas as configurações')
  .action(async () => {
    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: chalk.red.bold('ATENÇÃO: Isso removerá TODAS as configurações. Tem certeza que deseja continuar?'),
            default: false
        }
    ]);
    if (confirm) {
        configManager.clearConfig();
    }
  });

// Comando para executar tarefas
program
  .command('task')
  .description('Executar uma tarefa com o agente de IA')
  .option('-p, --provider <provider>', 'Provedor específico a usar')
  .option('-m, --model <model>', 'Modelo específico a usar')
  .option('-f, --file <file>', 'Arquivo para analisar ou editar')
  .option('-s, --shell', 'Permitir execução de comandos shell')
  .action(async (options) => {
    const config = configManager.getConfig();
    
    if (!config || Object.keys(config).length === 0) {
      console.log(chalk.red('❌ Nenhuma API configurada. Execute "mangaba config set" primeiro.'));
      return;
    }

    const { task } = await inquirer.prompt([
      {
        type: 'input',
        name: 'task',
        message: 'Descreva a tarefa que deseja executar:',
        validate: input => input.length > 0 || 'Por favor, descreva uma tarefa.'
      }
    ]);

    const agent = new AIAgent(config);
    await agent.executeTask(task, options);
  });

// ... (rest of the commands)

program.on('command:*', (operands) => {
  const availableCommands = program.commands.map(cmd => cmd.name());
  const [unknown] = operands;

  console.error(chalk.red(`error: unknown command '${unknown}'`));

  let suggestion = availableCommands.find(cmd => leven(cmd, unknown) < 3);

  if (suggestion) {
    console.log(chalk.yellow(`Did you mean '${suggestion}'?`));
  }
  
  process.exit(1);
});


async function configureProvider(provider) {
  const questions = {
    openai: [
      {
        type: 'password',
        name: 'apiKey',
        message: 'Digite sua API Key da OpenAI:',
        mask: '*'
      },
      {
        type: 'list',
        name: 'defaultModel',
        message: 'Modelo padrão:',
        choices: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo-preview']
      }
    ],
    gemini: [
      {
        type: 'password',
        name: 'apiKey',
        message: 'Digite sua API Key do Google Gemini:',
        mask: '*'
      },
      {
        type: 'list',
        name: 'defaultModel',
        message: 'Modelo padrão:',
        choices: ['gemini-pro', 'gemini-pro-vision']
      }
    ],
    anthropic: [
      {
        type: 'password',
        name: 'apiKey',
        message: 'Digite sua API Key da Anthropic:',
        mask: '*'
      },
      {
        type: 'list',
        name: 'defaultModel',
        message: 'Modelo padrão:',
        choices: ['claude-3-sonnet-20240229', 'claude-3-opus-20240229', 'claude-3-haiku-20240307']
      }
    ],
    ollama: [
      {
        type: 'input',
        name: 'baseUrl',
        message: 'URL base do Ollama:',
        default: 'http://localhost:11434'
      },
      {
        type: 'input',
        name: 'defaultModel',
        message: 'Modelo padrão (ex: llama2, mistral):',
        default: 'llama2'
      }
    ]
  };

  const answers = await inquirer.prompt(questions[provider]);
  configManager.setProviderConfig(provider, answers);
}

// Parse dos argumentos
program.parse(process.argv);

// Se nenhum comando foi fornecido, mostrar banner e ajuda
if (!process.argv.slice(2).length) {
  Banner.showWelcome();
  console.log('\n');
  program.outputHelp();
}