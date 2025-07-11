const axios = require('axios');

class CohereProvider {
  constructor(config) {
    this.config = config || {};
    this.apiKey = this.config.apiKey;
    this.baseURL = 'https://api.cohere.ai/v1';
    this.defaultModel = this.config.defaultModel || 'command';
  }

  async generateResponse(prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error('API Key da Cohere não configurada');
    }

    const model = options.model || this.defaultModel;
    const maxTokens = options.maxTokens || 1000;
    const temperature = options.temperature || 0.7;

    try {
      const response = await axios.post(
        `${this.baseURL}/generate`,
        {
          model: model,
          prompt: prompt,
          max_tokens: maxTokens,
          temperature: temperature,
          k: 0,
          stop_sequences: [],
          return_likelihoods: 'NONE'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'Cohere-Version': '2022-12-06'
          },
          timeout: 30000
        }
      );

      if (response.data && response.data.generations && response.data.generations[0]) {
        const generation = response.data.generations[0];
        return {
          content: generation.text.trim(),
          model: model,
          provider: 'cohere',
          usage: {
            prompt_tokens: prompt.length,
            completion_tokens: generation.text.length,
            total_tokens: prompt.length + generation.text.length
          }
        };
      } else {
        throw new Error('Resposta inválida da API Cohere');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.message;
        
        if (status === 401) {
          throw new Error('API Key da Cohere inválida');
        } else if (status === 429) {
          throw new Error('Limite de rate da Cohere excedido');
        } else if (status === 400) {
          throw new Error(`Parâmetros inválidos para Cohere: ${message}`);
        } else {
          throw new Error(`Erro da API Cohere: ${message}`);
        }
      } else {
        throw new Error(`Erro de conexão com Cohere: ${error.message}`);
      }
    }
  }

  async chat(messages, options = {}) {
    if (!this.apiKey) {
      throw new Error('API Key da Cohere não configurada');
    }

    const model = options.model || 'command';
    const maxTokens = options.maxTokens || 1000;
    const temperature = options.temperature || 0.7;

    try {
      // Converter mensagens para formato Cohere
      const chatHistory = messages.slice(0, -1).map(msg => ({
        role: msg.role === 'assistant' ? 'CHATBOT' : 'USER',
        message: msg.content
      }));
      
      const lastMessage = messages[messages.length - 1];

      const response = await axios.post(
        `${this.baseURL}/chat`,
        {
          model: model,
          message: lastMessage.content,
          chat_history: chatHistory,
          max_tokens: maxTokens,
          temperature: temperature,
          stream: false
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'Cohere-Version': '2022-12-06'
          },
          timeout: 30000
        }
      );

      if (response.data && response.data.text) {
        return {
          content: response.data.text.trim(),
          model: model,
          provider: 'cohere',
          usage: {
            prompt_tokens: response.data.meta?.billed_units?.input_tokens || 0,
            completion_tokens: response.data.meta?.billed_units?.output_tokens || 0,
            total_tokens: (response.data.meta?.billed_units?.input_tokens || 0) + (response.data.meta?.billed_units?.output_tokens || 0)
          }
        };
      } else {
        throw new Error('Resposta inválida da API Cohere Chat');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.message;
        
        if (status === 401) {
          throw new Error('API Key da Cohere inválida');
        } else if (status === 429) {
          throw new Error('Limite de rate da Cohere excedido');
        } else {
          throw new Error(`Erro da API Cohere Chat: ${message}`);
        }
      } else {
        throw new Error(`Erro de conexão com Cohere Chat: ${error.message}`);
      }
    }
  }

  async listModels() {
    return [
      'command',
      'command-light',
      'command-nightly',
      'command-light-nightly'
    ];
  }

  isConfigured() {
    return !!(this.apiKey);
  }

  getProviderInfo() {
    return {
      name: 'Cohere',
      description: 'Plataforma de IA conversacional com modelos otimizados para chat e geração de texto',
      website: 'https://cohere.ai',
      pricing: 'Tier gratuito disponível, planos pagos por uso',
      features: ['Chat API', 'Geração de texto', 'Embeddings', 'Classificação']
    };
  }
}

module.exports = CohereProvider;