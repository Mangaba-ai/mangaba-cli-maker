const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const Table = require('cli-table3');
const chalk = require('chalk');

class ConfigManager {
  constructor() {
    this.configDir = path.join(os.homedir(), '.mangaba');
    this.configFile = path.join(this.configDir, 'config.json');
    this.ensureConfigDir();
  }

  ensureConfigDir() {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true });
    }
  }

  getConfig() {
    try {
      if (fs.existsSync(this.configFile)) {
        return fs.readJsonSync(this.configFile);
      }
      return {};
    } catch (error) {
      console.error(chalk.red('Erro ao ler configuração:'), error.message);
      return {};
    }
  }

  setProviderConfig(provider, config) {
    const currentConfig = this.getConfig();
    currentConfig[provider] = {
      ...currentConfig[provider],
      ...config,
      updatedAt: new Date().toISOString()
    };
    
    try {
      fs.writeJsonSync(this.configFile, currentConfig, { spaces: 2 });
      console.log(chalk.green(`Configuração para '${provider}' salva com sucesso!`));
    } catch (error) {
      console.error(chalk.red('Erro ao salvar configuração:'), error.message);
      throw error;
    }
  }

  getProviderConfig(provider) {
    const config = this.getConfig();
    return config[provider] || null;
  }

  removeProviderConfig(provider) {
    const config = this.getConfig();
    delete config[provider];
    
    try {
      fs.writeJsonSync(this.configFile, config, { spaces: 2 });
      console.log(chalk.yellow(`Configuração para '${provider}' removida.`));
    } catch (error) {
      console.error(chalk.red('Erro ao remover configuração:'), error.message);
      throw error;
    }
  }

  clearConfig() {
    try {
      if (fs.existsSync(this.configFile)) {
        fs.removeSync(this.configFile);
        console.log(chalk.yellow('Todas as configurações foram removidas.'));
      }
    } catch (error) {
      console.error(chalk.red('Erro ao limpar a configuração:'), error.message);
      throw error;
    }
  }

  displayConfig() {
    const config = this.getConfig();
    const table = new Table({
      head: [chalk.cyan('Provider'), chalk.cyan('Configuração Chave'), chalk.cyan('Valor')],
      colWidths: [20, 30, 50]
    });

    for (const provider in config) {
      if (Object.hasOwnProperty.call(config, provider)) {
        const providerConfig = config[provider];
        table.push([chalk.bold(provider), 'apiKey', providerConfig.apiKey ? '****' + providerConfig.apiKey.slice(-4) : 'N/A']);
        table.push(['', 'defaultModel', providerConfig.defaultModel || 'N/A']);
        table.push(['', 'baseUrl', providerConfig.baseUrl || 'N/A']);
      }
    }

    console.log(table.toString());
  }

  listProviders() {
    const config = this.getConfig();
    return Object.keys(config);
  }

  validateConfig(provider) {
    const config = this.getProviderConfig(provider);
    if (!config) return false;

    switch (provider) {
      case 'openai':
      case 'gemini':
      case 'anthropic':
      case 'huggingface':
      case 'cohere':
      case 'together':
      case 'groq':
        return !!(config.apiKey && config.defaultModel);
      case 'ollama':
      case 'localai':
        return !!(config.baseUrl && config.defaultModel);
      default:
        return false;
    }
  }
}

module.exports = ConfigManager;