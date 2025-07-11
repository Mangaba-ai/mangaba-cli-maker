const axios = require('axios');

class GeminiProvider {
  constructor(config) {
    this.config = config;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta';
    
    if (config && config.apiKey) {
      this.client = axios.create({
        baseURL: this.baseURL,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }

  async executeTask(task, model = null) {
    if (!this.client) {
      throw new Error('Gemini não configurado. Execute "mangaba config" primeiro.');
    }

    const selectedModel = model || this.config.defaultModel || 'gemini-pro';
    
    try {
      const response = await this.client.post(
        `/models/${selectedModel}:generateContent?key=${this.config.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Você é um assistente de IA útil e eficiente. Responda de forma clara e concisa em português brasileiro.\n\n${task}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048
          }
        }
      );

      if (response.data.candidates && response.data.candidates[0]) {
        return response.data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Resposta inválida do Gemini');
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async listModels() {
    if (!this.client) {
      throw new Error('Gemini não configurado.');
    }

    try {
      const response = await this.client.get(`/models?key=${this.config.apiKey}`);
      return response.data.models
        .filter(model => model.name.includes('gemini'))
        .map(model => model.name.split('/').pop())
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
      await this.client.get(`/models?key=${this.config.apiKey}`);
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
        case 400:
          if (errorData?.error?.message?.includes('API key')) {
            const err400 = new Error('API Key inválida');
            err400.code = 'INVALID_API_KEY';
            throw err400;
          }
          throw new Error(errorData?.error?.message || 'Requisição inválida');
        case 403:
          const err403 = new Error('API Key sem permissão ou quota excedida');
          err403.code = 'INVALID_API_KEY';
          throw err403;
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
      throw new Error('Erro de conexão com a API do Gemini');
    } else {
      throw new Error(error.message);
    }
  }
}

module.exports = GeminiProvider;