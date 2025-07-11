const axios = require('axios');

class GroqProvider {
  constructor(config) {
    this.config = config || {};
    this.apiKey = this.config.apiKey;
    this.baseURL = 'https://api.groq.com/openai/v1';
    this.defaultModel = this.config.defaultModel || 'llama2-70b-4096';
  }

  async generateResponse(prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error('API Key do Groq não configurada');
    }

    const model = options.model || this.defaultModel;
    const maxTokens = options.maxTokens || 1000;
    const temperature = options.temperature || 0.7;

    try {
      const response = await axios.post(
        `${this.baseURL}/completions`,
        {
          model: model,
          prompt: prompt,
          max_tokens: maxTokens,
          temperature: temperature,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop: null
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data && response.data.choices && response.data.choices[0]) {
        const choice = response.data.choices[0];
        return {
          content: choice.text.trim(),
          model: model,
          provider: 'groq',
          usage: {
            prompt_tokens: response.data.usage?.prompt_tokens || 0,
            completion_tokens: response.data.usage?.completion_tokens || 0,
            total_tokens: response.data.usage?.total_tokens || 0
          }
        };
      } else {
        throw new Error('Resposta inválida da API Groq');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.error?.message || error.message;
        
        if (status === 401) {
          throw new Error('API Key do Groq inválida');
        } else if (status === 429) {
          throw new Error('Limite de rate do Groq excedido');
        } else if (status === 400) {
          throw new Error(`Parâmetros inválidos para Groq: ${message}`);
        } else {
          throw new Error(`Erro da API Groq: ${message}`);
        }
      } else {
        throw new Error(`Erro de conexão com Groq: ${error.message}`);
      }
    }
  }

  async chat(messages, options = {}) {
    if (!this.apiKey) {
      throw new Error('API Key do Groq não configurada');
    }

    const model = options.model || this.defaultModel;
    const maxTokens = options.maxTokens || 1000;
    const temperature = options.temperature || 0.7;

    try {
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: model,
          messages: messages,
          max_tokens: maxTokens,
          temperature: temperature,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stream: false
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data && response.data.choices && response.data.choices[0]) {
        const choice = response.data.choices[0];
        return {
          content: choice.message.content.trim(),
          model: model,
          provider: 'groq',
          usage: {
            prompt_tokens: response.data.usage?.prompt_tokens || 0,
            completion_tokens: response.data.usage?.completion_tokens || 0,
            total_tokens: response.data.usage?.total_tokens || 0
          }
        };
      } else {
        throw new Error('Resposta inválida da API Groq Chat');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.error?.message || error.message;
        
        if (status === 401) {
          throw new Error('API Key do Groq inválida');
        } else if (status === 429) {
          throw new Error('Limite de rate do Groq excedido');
        } else {
          throw new Error(`Erro da API Groq Chat: ${message}`);
        }
      } else {
        throw new Error(`Erro de conexão com Groq Chat: ${error.message}`);
      }
    }
  }

  async listModels() {
    return [
      // Llama 2 Models
      'llama2-70b-4096',
      
      // Mixtral Models
      'mixtral-8x7b-32768',
      
      // Gemma Models
      'gemma-7b-it',
      
      // Code Models
      'llama3-groq-70b-8192-tool-use-preview',
      'llama3-groq-8b-8192-tool-use-preview',
      
      // Chat Models
      'llama-3.1-70b-versatile',
      'llama-3.1-8b-instant',
      'llama3-70b-8192',
      'llama3-8b-8192'
    ];
  }

  isConfigured() {
    return !!(this.apiKey);
  }

  getProviderInfo() {
    return {
      name: 'Groq',
      description: 'Inferência ultra-rápida para modelos open source com hardware especializado',
      website: 'https://groq.com',
      pricing: 'Freemium com tier gratuito generoso',
      features: ['Velocidade extrema', 'Llama 3.1', 'Mixtral', 'Gemma', 'Tool Use']
    };
  }
}

module.exports = GroqProvider;