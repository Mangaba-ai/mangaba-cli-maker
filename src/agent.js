const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const axios = require('axios');
const OpenAIProvider = require('./providers/openai');
const GeminiProvider = require('./providers/gemini');
const AnthropicProvider = require('./providers/anthropic');
const OllamaProvider = require('./providers/ollama');
const HuggingFaceProvider = require('./providers/huggingface');
const CohereProvider = require('./providers/cohere');
const TogetherProvider = require('./providers/together');
const LocalAIProvider = require('./providers/localai');
const GroqProvider = require('./providers/groq');
const ContextManager = require('./context');
const FileSearcher = require('./tools/fileSearcher');
const WebSearcher = require('./tools/webSearcher');

class AIAgent {
  constructor(config) {
    this.config = config;
    this.providers = {
      openai: new OpenAIProvider(config.openai),
      gemini: new GeminiProvider(config.gemini),
      anthropic: new AnthropicProvider(config.anthropic),
      ollama: new OllamaProvider(config.ollama),
      huggingface: new HuggingFaceProvider(config.huggingface),
      cohere: new CohereProvider(config.cohere),
      together: new TogetherProvider(config.together),
      localai: new LocalAIProvider(config.localai),
      groq: new GroqProvider(config.groq)
    };
    this.contextManager = new ContextManager();
    this.fileSearcher = new FileSearcher();
    this.webSearcher = new WebSearcher();
    this.stats = {
      tasksExecuted: 0,
      tokensUsed: 0,
      commandsRun: 0,
      filesAnalyzed: 0
    };
  }

  async executeTask(task, options = {}) {
    const spinner = ora('Processando tarefa...').start();
    try {
      // ... (rest of the function)
    } catch (error) {
      spinner.fail('Falha na tarefa.');
      // ... (error handling)
    }
  }

  // ... (other methods)
}

module.exports = AIAgent;