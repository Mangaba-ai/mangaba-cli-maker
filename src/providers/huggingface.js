const axios = require('axios');

class HuggingFaceProvider {
  constructor(config) {
    this.config = config || {};
    this.apiKey = this.config.apiKey;
    this.baseURL = 'https://api-inference.huggingface.co/models';
    this.defaultModel = this.config.defaultModel || 'microsoft/DialoGPT-large';
  }

  async generateResponse(prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error('API Key da Hugging Face não configurada');
    }

    const model = options.model || this.defaultModel;
    const maxTokens = options.maxTokens || 512;
    const temperature = options.temperature || 0.7;

    try {
      const response = await axios.post(
        `${this.baseURL}/${model}`,
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: maxTokens,
            temperature: temperature,
            return_full_text: false,
            do_sample: true
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data && response.data[0] && response.data[0].generated_text) {
        return {
          content: response.data[0].generated_text.trim(),
          model: model,
          provider: 'huggingface',
          usage: {
            prompt_tokens: prompt.length,
            completion_tokens: response.data[0].generated_text.length,
            total_tokens: prompt.length + response.data[0].generated_text.length
          }
        };
      } else {
        throw new Error('Resposta inválida da API Hugging Face');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.error || error.message;
        
        if (status === 401) {
          throw new Error('API Key da Hugging Face inválida');
        } else if (status === 429) {
          throw new Error('Limite de rate da Hugging Face excedido');
        } else if (status === 503) {
          throw new Error('Modelo da Hugging Face está carregando, tente novamente em alguns segundos');
        } else {
          throw new Error(`Erro da API Hugging Face: ${message}`);
        }
      } else {
        throw new Error(`Erro de conexão com Hugging Face: ${error.message}`);
      }
    }
  }

  async listModels() {
    // Modelos populares da Hugging Face para chat/text generation
    return [
      'microsoft/DialoGPT-large',
      'microsoft/DialoGPT-medium',
      'facebook/blenderbot-400M-distill',
      'facebook/blenderbot-1B-distill',
      'google/flan-t5-large',
      'google/flan-t5-xl',
      'bigscience/bloom-560m',
      'bigscience/bloom-1b1',
      'EleutherAI/gpt-neo-1.3B',
      'EleutherAI/gpt-neo-2.7B',
      'EleutherAI/gpt-j-6B'
    ];
  }

  isConfigured() {
    return !!(this.apiKey);
  }

  getProviderInfo() {
    return {
      name: 'Hugging Face',
      description: 'Plataforma de modelos open source com milhares de modelos disponíveis',
      website: 'https://huggingface.co',
      pricing: 'Gratuito com limitações, planos pagos disponíveis',
      features: ['Modelos open source', 'Inference API', 'Múltiplos modelos', 'Comunidade ativa']
    };
  }
}

module.exports = HuggingFaceProvider;