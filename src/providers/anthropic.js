const axios = require('axios');

class AnthropicProvider {
  constructor(config) {
    this.config = config;
    this.baseURL = 'https://api.anthropic.com/v1';
    
    if (config && config.apiKey) {
      this.client = axios.create({
        baseURL: this.baseURL,
        headers: {
          'x-api-key': config.apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        }
      });
    }
  }

  async executeTask(task, model = null) {
    if (!this.client) {
      throw new Error('Anthropic não configurado. Execute "mangaba config" primeiro.');
    }

    const selectedModel = model || this.config.defaultModel || 'claude-3-sonnet-20240229';
    
    try {
      const response = await this.client.post('/messages', {
        model: selectedModel,
        max_tokens: 2000,
        temperature: 0.7,
        system: 'Você é um assistente de IA útil e eficiente. Responda de forma clara e concisa em português brasileiro.',
        messages: [
          {
            role: 'user',
            content: task
          }
        ]
      });

      if (response.data.content && response.data.content[0]) {
        return response.data.content[0].text;
      } else {
        throw new Error('Resposta inválida da Anthropic');
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async listModels() {
    // Anthropic não tem endpoint público para listar modelos
    // Retornamos os modelos conhecidos
    return [
      'claude-3-opus-20240229',
      'claude-3-sonnet-20240229',
      'claude-3-haiku-20240307',
      'claude-2.1',
      'claude-2.0',
      'claude-instant-1.2'
    ];
  }

  async testConnection() {
    if (!this.client) {
      return { success: false, error: 'Cliente não configurado' };
    }

    try {
      // Fazemos uma requisição simples para testar a conexão
      await this.client.post('/messages', {
        model: this.config.defaultModel || 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [
          {
            role: 'user',
            content: 'Teste'
          }
        ]
      });
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
        case 403:
          const err403 = new Error('Acesso negado - verifique suas permissões');
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
        case 400:
          if (errorData?.error?.type === 'invalid_request_error') {
            throw new Error(errorData.error.message || 'Requisição inválida');
          }
          throw new Error('Erro na requisição');
        default:
          throw new Error(errorData?.error?.message || `Erro HTTP ${status}`);
      }
    } else if (error.request) {
      throw new Error('Erro de conexão com a API da Anthropic');
    } else {
      throw new Error(error.message);
    }
  }
}

module.exports = AnthropicProvider;