const axios = require('axios');

class OllamaProvider {
  constructor(config) {
    this.config = config;
    
    if (config && config.baseUrl) {
      this.client = axios.create({
        baseURL: config.baseUrl,
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 60 segundos para modelos locais
      });
    }
  }

  async executeTask(task, model = null) {
    if (!this.client) {
      throw new Error('Ollama não configurado. Execute "mangaba config" primeiro.');
    }

    const selectedModel = model || this.config.defaultModel || 'llama2';
    
    try {
      const response = await this.client.post('/api/generate', {
        model: selectedModel,
        prompt: `Você é um assistente de IA útil e eficiente. Responda de forma clara e concisa em português brasileiro.\n\n${task}`,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          top_k: 40
        }
      });

      if (response.data && response.data.response) {
        return response.data.response.trim();
      } else {
        throw new Error('Resposta inválida do Ollama');
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async listModels() {
    if (!this.client) {
      throw new Error('Ollama não configurado.');
    }

    try {
      const response = await this.client.get('/api/tags');
      if (response.data && response.data.models) {
        return response.data.models.map(model => model.name).sort();
      }
      return [];
    } catch (error) {
      this.handleError(error);
    }
  }

  async testConnection() {
    if (!this.client) {
      return { success: false, error: 'Cliente não configurado' };
    }

    try {
      await this.client.get('/api/tags');
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.code === 'ECONNREFUSED' 
          ? 'Não foi possível conectar ao Ollama. Verifique se está rodando.'
          : error.message 
      };
    }
  }

  async pullModel(modelName) {
    if (!this.client) {
      throw new Error('Ollama não configurado.');
    }

    try {
      const response = await this.client.post('/api/pull', {
        name: modelName
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteModel(modelName) {
    if (!this.client) {
      throw new Error('Ollama não configurado.');
    }

    try {
      const response = await this.client.delete('/api/delete', {
        data: { name: modelName }
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Não foi possível conectar ao Ollama. Verifique se o serviço está rodando.');
    } else if (error.code === 'ETIMEDOUT') {
      throw new Error('Timeout na conexão com Ollama. O modelo pode estar sendo carregado.');
    } else if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;
      
      switch (status) {
        case 404:
          if (errorData?.error?.includes('model')) {
            const err404 = new Error(`Modelo não encontrado. Use 'ollama pull <modelo>' para baixá-lo.`);
            err404.code = 'MODEL_NOT_FOUND';
            throw err404;
          }
          throw new Error('Endpoint não encontrado');
        case 400:
          throw new Error(errorData?.error || 'Requisição inválida');
        case 500:
          throw new Error('Erro interno do Ollama');
        default:
          throw new Error(errorData?.error || `Erro HTTP ${status}`);
      }
    } else if (error.request) {
      throw new Error('Erro de conexão com Ollama');
    } else {
      throw new Error(error.message);
    }
  }
}

module.exports = OllamaProvider;