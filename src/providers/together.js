const axios = require('axios');

class TogetherProvider {
  constructor(config) {
    this.config = config || {};
    this.apiKey = this.config.apiKey;
    this.baseURL = 'https://api.together.xyz/v1';
    this.defaultModel = this.config.defaultModel || 'meta-llama/Llama-2-7b-chat-hf';
  }

  async generateResponse(prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error('API Key da Together AI não configurada');
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
          top_p: 0.9,
          top_k: 50,
          repetition_penalty: 1.1,
          stop: ['</s>', '[INST]', '[/INST]']
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );

      if (response.data && response.data.choices && response.data.choices[0]) {
        const choice = response.data.choices[0];
        return {
          content: choice.text.trim(),
          model: model,
          provider: 'together',
          usage: {
            prompt_tokens: response.data.usage?.prompt_tokens || 0,
            completion_tokens: response.data.usage?.completion_tokens || 0,
            total_tokens: response.data.usage?.total_tokens || 0
          }
        };
      } else {
        throw new Error('Resposta inválida da API Together AI');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.error?.message || error.message;
        
        if (status === 401) {
          throw new Error('API Key da Together AI inválida');
        } else if (status === 429) {
          throw new Error('Limite de rate da Together AI excedido');
        } else if (status === 400) {
          throw new Error(`Parâmetros inválidos para Together AI: ${message}`);
        } else {
          throw new Error(`Erro da API Together AI: ${message}`);
        }
      } else {
        throw new Error(`Erro de conexão com Together AI: ${error.message}`);
      }
    }
  }

  async chat(messages, options = {}) {
    if (!this.apiKey) {
      throw new Error('API Key da Together AI não configurada');
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
          top_p: 0.9,
          top_k: 50,
          repetition_penalty: 1.1,
          stream: false
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );

      if (response.data && response.data.choices && response.data.choices[0]) {
        const choice = response.data.choices[0];
        return {
          content: choice.message.content.trim(),
          model: model,
          provider: 'together',
          usage: {
            prompt_tokens: response.data.usage?.prompt_tokens || 0,
            completion_tokens: response.data.usage?.completion_tokens || 0,
            total_tokens: response.data.usage?.total_tokens || 0
          }
        };
      } else {
        throw new Error('Resposta inválida da API Together AI Chat');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.error?.message || error.message;
        
        if (status === 401) {
          throw new Error('API Key da Together AI inválida');
        } else if (status === 429) {
          throw new Error('Limite de rate da Together AI excedido');
        } else {
          throw new Error(`Erro da API Together AI Chat: ${message}`);
        }
      } else {
        throw new Error(`Erro de conexão com Together AI Chat: ${error.message}`);
      }
    }
  }

  async listModels() {
    return [
      // Llama 2 Models
      'meta-llama/Llama-2-7b-chat-hf',
      'meta-llama/Llama-2-13b-chat-hf',
      'meta-llama/Llama-2-70b-chat-hf',
      
      // Code Llama Models
      'codellama/CodeLlama-7b-Instruct-hf',
      'codellama/CodeLlama-13b-Instruct-hf',
      'codellama/CodeLlama-34b-Instruct-hf',
      
      // Mistral Models
      'mistralai/Mistral-7B-Instruct-v0.1',
      'mistralai/Mixtral-8x7B-Instruct-v0.1',
      
      // Other Popular Models
      'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO',
      'teknium/OpenHermes-2.5-Mistral-7B',
      'Open-Orca/Mistral-7B-OpenOrca',
      'WizardLM/WizardLM-13B-V1.2',
      'upstage/SOLAR-10.7B-Instruct-v1.0'
    ];
  }

  isConfigured() {
    return !!(this.apiKey);
  }

  getProviderInfo() {
    return {
      name: 'Together AI',
      description: 'Plataforma que oferece acesso a dezenas de modelos open source otimizados',
      website: 'https://together.ai',
      pricing: 'Pay-per-use com preços competitivos',
      features: ['50+ modelos open source', 'Llama 2', 'Code Llama', 'Mistral', 'Mixtral']
    };
  }
}

module.exports = TogetherProvider;