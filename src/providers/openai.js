const axios = require('axios');

class OpenAIProvider {
  constructor(config) {
    this.config = config;
    this.baseURL = 'https://api.openai.com/v1';
    
    if (config && config.apiKey) {
      this.client = axios.create({
        baseURL: this.baseURL,
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
    }
  }

  async executeTask(task, model = null) {
    if (!this.client) {
      throw new Error('OpenAI não configurado. Execute "mangaba config" primeiro.');
    }

    const selectedModel = model || this.config.defaultModel || 'gpt-3.5-turbo';
    
    try {
      const response = await this.client.post('/chat/completions', {
        model: selectedModel,
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente de IA útil e eficiente. Responda de forma clara e concisa em português brasileiro.'
          },
          {
            role: 'user',
            content: task
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      this.handleError(error);
    }
  }

  async listModels() {
    if (!this.client) {
      throw new Error('OpenAI não configurado.');
    }

    try {
      const response = await this.client.get('/models');
      return response.data.data
        .filter(model => model.id.includes('gpt'))
        .map(model => model.id)
        .sort();
    } catch (error) {
      this.handleError(error);
    }
  }

  async testConnection() {
    if (!this.client) {
      return { success: false, error: 'Cliente não configurado' };
    }

    try {
      await this.client.get('/models');
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error?.message || error.message 
      };
    }
  }

  handleError(error) {
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;
      
      switch (status) {
        case 401:
          const err401 = new Error('API Key inválida ou expirada');
          err401.code = 'INVALID_API_KEY';
          throw err401;
        case 429:
          const err429 = new Error('Limite de requisições atingido');
          err429.code = 'RATE_LIMIT';
          throw err429;
        case 404:
          const err404 = new Error('Modelo não encontrado');
          err404.code = 'MODEL_NOT_FOUND';
          throw err404;
        default:
          throw new Error(errorData?.error?.message || `Erro HTTP ${status}`);
      }
    } else if (error.request) {
      throw new Error('Erro de conexão com a API da OpenAI');
    } else {
      throw new Error(error.message);
    }
  }
}

module.exports = OpenAIProvider;