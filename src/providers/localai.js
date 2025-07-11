const axios = require('axios');

class LocalAIProvider {
  constructor(config) {
    this.config = config || {};
    this.baseURL = this.config.baseURL || 'http://localhost:8080';
    this.defaultModel = this.config.defaultModel || 'gpt-3.5-turbo';
    this.apiKey = this.config.apiKey || 'not-needed'; // LocalAI pode não precisar de API key
  }

  async generateResponse(prompt, options = {}) {
    const model = options.model || this.defaultModel;
    const maxTokens = options.maxTokens || 1000;
    const temperature = options.temperature || 0.7;

    try {
      const response = await axios.post(
        `${this.baseURL}/v1/completions`,
        {
          model: model,
          prompt: prompt,
          max_tokens: maxTokens,
          temperature: temperature,
          top_p: 0.9,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop: null
        },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(this.apiKey && this.apiKey !== 'not-needed' ? { 'Authorization': `Bearer ${this.apiKey}` } : {})
          },
          timeout: 120000 // 2 minutos para modelos locais
        }
      );

      if (response.data && response.data.choices && response.data.choices[0]) {
        const choice = response.data.choices[0];
        return {
          content: choice.text.trim(),
          model: model,
          provider: 'localai',
          usage: {
            prompt_tokens: response.data.usage?.prompt_tokens || 0,
            completion_tokens: response.data.usage?.completion_tokens || 0,
            total_tokens: response.data.usage?.total_tokens || 0
          }
        };
      } else {
        throw new Error('Resposta inválida do LocalAI');
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('LocalAI não está rodando. Verifique se o servidor está ativo em ' + this.baseURL);
      } else if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.error?.message || error.message;
        
        if (status === 404) {
          throw new Error(`Modelo '${model}' não encontrado no LocalAI`);
        } else if (status === 400) {
          throw new Error(`Parâmetros inválidos para LocalAI: ${message}`);
        } else {
          throw new Error(`Erro do LocalAI: ${message}`);
        }
      } else {
        throw new Error(`Erro de conexão com LocalAI: ${error.message}`);
      }
    }
  }

  async chat(messages, options = {}) {
    const model = options.model || this.defaultModel;
    const maxTokens = options.maxTokens || 1000;
    const temperature = options.temperature || 0.7;

    try {
      const response = await axios.post(
        `${this.baseURL}/v1/chat/completions`,
        {
          model: model,
          messages: messages,
          max_tokens: maxTokens,
          temperature: temperature,
          top_p: 0.9,
          frequency_penalty: 0,
          presence_penalty: 0,
          stream: false
        },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(this.apiKey && this.apiKey !== 'not-needed' ? { 'Authorization': `Bearer ${this.apiKey}` } : {})
          },
          timeout: 120000
        }
      );

      if (response.data && response.data.choices && response.data.choices[0]) {
        const choice = response.data.choices[0];
        return {
          content: choice.message.content.trim(),
          model: model,
          provider: 'localai',
          usage: {
            prompt_tokens: response.data.usage?.prompt_tokens || 0,
            completion_tokens: response.data.usage?.completion_tokens || 0,
            total_tokens: response.data.usage?.total_tokens || 0
          }
        };
      } else {
        throw new Error('Resposta inválida do LocalAI Chat');
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('LocalAI não está rodando. Verifique se o servidor está ativo em ' + this.baseURL);
      } else if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.error?.message || error.message;
        
        if (status === 404) {
          throw new Error(`Modelo '${model}' não encontrado no LocalAI`);
        } else {
          throw new Error(`Erro do LocalAI Chat: ${message}`);
        }
      } else {
        throw new Error(`Erro de conexão com LocalAI Chat: ${error.message}`);
      }
    }
  }

  async listModels() {
    try {
      const response = await axios.get(`${this.baseURL}/v1/models`, {
        headers: {
          ...(this.apiKey && this.apiKey !== 'not-needed' ? { 'Authorization': `Bearer ${this.apiKey}` } : {})
        },
        timeout: 10000
      });

      if (response.data && response.data.data) {
        return response.data.data.map(model => model.id);
      } else {
        // Fallback para modelos comuns se a API não responder
        return this.getCommonModels();
      }
    } catch (error) {
      console.warn('Não foi possível listar modelos do LocalAI, usando lista padrão');
      return this.getCommonModels();
    }
  }

  getCommonModels() {
    return [
      'gpt-3.5-turbo',
      'gpt-4',
      'llama2',
      'llama2-chat',
      'codellama',
      'mistral',
      'mixtral',
      'vicuna',
      'alpaca',
      'wizardlm',
      'orca-mini'
    ];
  }

  async checkConnection() {
    try {
      const response = await axios.get(`${this.baseURL}/v1/models`, {
        timeout: 5000,
        headers: {
          ...(this.apiKey && this.apiKey !== 'not-needed' ? { 'Authorization': `Bearer ${this.apiKey}` } : {})
        }
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  isConfigured() {
    return !!(this.baseURL);
  }

  getProviderInfo() {
    return {
      name: 'LocalAI',
      description: 'Execute modelos de IA localmente com compatibilidade OpenAI API',
      website: 'https://localai.io',
      pricing: 'Gratuito - execução local',
      features: ['Execução local', 'Privacidade total', 'Sem limites de uso', 'Compatível com OpenAI API']
    };
  }
}

module.exports = LocalAIProvider;