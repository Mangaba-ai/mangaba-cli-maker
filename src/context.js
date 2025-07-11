const fs = require('fs-extra');
const path = require('path');
const os = require('os');

class ContextManager {
  constructor() {
    this.contextDir = path.join(os.homedir(), '.mangaba');
    this.contextFile = path.join(this.contextDir, 'context.json');
    this.maxContextSize = 10; // Máximo de 10 entradas no contexto
    this.ensureContextDir();
  }

  ensureContextDir() {
    if (!fs.existsSync(this.contextDir)) {
      fs.mkdirSync(this.contextDir, { recursive: true });
    }
  }

  getContext() {
    try {
      if (fs.existsSync(this.contextFile)) {
        return fs.readJsonSync(this.contextFile);
      }
      return {
        conversations: [],
        userPreferences: {},
        projectContext: {},
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Erro ao ler contexto:', error.message);
      return {
        conversations: [],
        userPreferences: {},
        projectContext: {},
        createdAt: new Date().toISOString()
      };
    }
  }

  addContext(info, type = 'conversation') {
    const context = this.getContext();
    
    const entry = {
      id: Date.now().toString(),
      type: type,
      content: info,
      timestamp: new Date().toISOString()
    };

    switch (type) {
      case 'conversation':
        context.conversations.push(entry);
        // Manter apenas as últimas conversas
        if (context.conversations.length > this.maxContextSize) {
          context.conversations = context.conversations.slice(-this.maxContextSize);
        }
        break;
      case 'preference':
        context.userPreferences[entry.id] = entry;
        break;
      case 'project':
        context.projectContext[entry.id] = entry;
        break;
    }

    this.saveContext(context);
  }

  addConversation(task, response, provider) {
    const conversationEntry = {
      task: task,
      response: response.substring(0, 500) + (response.length > 500 ? '...' : ''),
      provider: provider,
      timestamp: new Date().toISOString()
    };
    
    this.addContext(conversationEntry, 'conversation');
  }

  addProjectInfo(projectPath, info) {
    const projectEntry = {
      projectPath: projectPath,
      info: info,
      timestamp: new Date().toISOString()
    };
    
    this.addContext(projectEntry, 'project');
  }

  addUserPreference(key, value) {
    const preferenceEntry = {
      key: key,
      value: value,
      timestamp: new Date().toISOString()
    };
    
    this.addContext(preferenceEntry, 'preference');
  }

  getRecentConversations(limit = 5) {
    const context = this.getContext();
    return context.conversations.slice(-limit);
  }

  getProjectContext(projectPath) {
    const context = this.getContext();
    return Object.values(context.projectContext)
      .filter(entry => entry.content.projectPath === projectPath)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  getUserPreferences() {
    const context = this.getContext();
    return context.userPreferences;
  }

  clear() {
    const emptyContext = {
      conversations: [],
      userPreferences: {},
      projectContext: {},
      clearedAt: new Date().toISOString()
    };
    
    this.saveContext(emptyContext);
  }

  clearConversations() {
    const context = this.getContext();
    context.conversations = [];
    context.conversationsClearedAt = new Date().toISOString();
    this.saveContext(context);
  }

  saveContext(context) {
    try {
      context.updatedAt = new Date().toISOString();
      fs.writeJsonSync(this.contextFile, context, { spaces: 2 });
    } catch (error) {
      console.error('Erro ao salvar contexto:', error.message);
    }
  }

  getContextSummary() {
    const context = this.getContext();
    return {
      totalConversations: context.conversations.length,
      totalPreferences: Object.keys(context.userPreferences).length,
      totalProjectEntries: Object.keys(context.projectContext).length,
      lastUpdated: context.updatedAt,
      createdAt: context.createdAt
    };
  }

  searchContext(query) {
    const context = this.getContext();
    const results = [];
    
    // Buscar nas conversas
    context.conversations.forEach(conv => {
      if (JSON.stringify(conv.content).toLowerCase().includes(query.toLowerCase())) {
        results.push({
          type: 'conversation',
          content: conv.content,
          timestamp: conv.timestamp
        });
      }
    });
    
    // Buscar no contexto do projeto
    Object.values(context.projectContext).forEach(proj => {
      if (JSON.stringify(proj.content).toLowerCase().includes(query.toLowerCase())) {
        results.push({
          type: 'project',
          content: proj.content,
          timestamp: proj.timestamp
        });
      }
    });
    
    return results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  exportContext() {
    const context = this.getContext();
    const exportData = {
      ...context,
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const exportPath = path.join(this.contextDir, `context-export-${Date.now()}.json`);
    fs.writeJsonSync(exportPath, exportData, { spaces: 2 });
    
    return exportPath;
  }

  importContext(filePath) {
    try {
      const importedData = fs.readJsonSync(filePath);
      
      // Validar estrutura básica
      if (!importedData.conversations || !importedData.userPreferences || !importedData.projectContext) {
        throw new Error('Arquivo de contexto inválido');
      }
      
      // Mesclar com contexto atual
      const currentContext = this.getContext();
      
      const mergedContext = {
        conversations: [...currentContext.conversations, ...importedData.conversations],
        userPreferences: { ...currentContext.userPreferences, ...importedData.userPreferences },
        projectContext: { ...currentContext.projectContext, ...importedData.projectContext },
        importedAt: new Date().toISOString(),
        importedFrom: filePath
      };
      
      // Limitar conversas se necessário
      if (mergedContext.conversations.length > this.maxContextSize * 2) {
        mergedContext.conversations = mergedContext.conversations.slice(-this.maxContextSize * 2);
      }
      
      this.saveContext(mergedContext);
      return true;
      
    } catch (error) {
      console.error('Erro ao importar contexto:', error.message);
      return false;
    }
  }
}

module.exports = ContextManager;