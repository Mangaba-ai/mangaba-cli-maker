const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

class FileSearcher {
  constructor() {
    this.defaultIgnorePatterns = [
      'node_modules/**',
      '.git/**',
      'dist/**',
      'build/**',
      '*.log',
      '.env*',
      '*.tmp',
      '*.temp'
    ];
  }

  async search(pattern, options = {}) {
    const {
      content = false,
      directory = process.cwd(),
      ignoreCase = true,
      maxResults = 50,
      includeHidden = false
    } = options;

    if (content) {
      return await this.searchContent(pattern, { directory, ignoreCase, maxResults, includeHidden });
    } else {
      return await this.searchFiles(pattern, { directory, maxResults, includeHidden });
    }
  }

  async searchFiles(pattern, options = {}) {
    const { directory, maxResults, includeHidden } = options;
    
    try {
      const globPattern = path.join(directory, '**', pattern);
      const globOptions = {
        ignore: this.defaultIgnorePatterns,
        dot: includeHidden,
        absolute: true,
        nodir: true
      };

      const files = await glob(globPattern, globOptions);
      
      return files.slice(0, maxResults).map(file => ({
        path: path.relative(directory, file),
        fullPath: file,
        type: 'file',
        size: this.getFileSize(file),
        modified: this.getFileModified(file)
      }));
      
    } catch (error) {
      throw new Error(`Erro na busca de arquivos: ${error.message}`);
    }
  }

  async searchContent(pattern, options = {}) {
    const { directory, ignoreCase, maxResults, includeHidden } = options;
    const results = [];
    
    try {
      // Buscar todos os arquivos de texto
      const textFiles = await this.getTextFiles(directory, includeHidden);
      
      const regex = new RegExp(pattern, ignoreCase ? 'gi' : 'g');
      
      for (const file of textFiles) {
        if (results.length >= maxResults) break;
        
        try {
          const content = await fs.readFile(file, 'utf8');
          const lines = content.split('\n');
          const matches = [];
          
          lines.forEach((line, index) => {
            if (regex.test(line)) {
              matches.push({
                line: index + 1,
                content: line,
                match: line.match(regex)
              });
            }
          });
          
          if (matches.length > 0) {
            results.push({
              path: path.relative(directory, file),
              fullPath: file,
              type: 'content',
              matches: matches.slice(0, 10), // Limitar a 10 matches por arquivo
              totalMatches: matches.length
            });
          }
          
        } catch (error) {
          // Ignorar arquivos que não podem ser lidos como texto
          continue;
        }
      }
      
      return results;
      
    } catch (error) {
      throw new Error(`Erro na busca de conteúdo: ${error.message}`);
    }
  }

  async getTextFiles(directory, includeHidden = false) {
    const textExtensions = [
      '.js', '.ts', '.jsx', '.tsx', '.vue', '.svelte',
      '.py', '.rb', '.php', '.java', '.c', '.cpp', '.cs',
      '.go', '.rs', '.swift', '.kt', '.scala',
      '.html', '.htm', '.css', '.scss', '.sass', '.less',
      '.json', '.xml', '.yaml', '.yml', '.toml',
      '.md', '.txt', '.rst', '.adoc',
      '.sh', '.bash', '.zsh', '.fish', '.ps1',
      '.sql', '.graphql', '.gql',
      '.dockerfile', '.gitignore', '.gitattributes',
      '.env', '.env.example', '.env.local'
    ];
    
    const globPattern = path.join(directory, '**', '*');
    const globOptions = {
      ignore: this.defaultIgnorePatterns,
      dot: includeHidden,
      absolute: true,
      nodir: true
    };

    const allFiles = await glob(globPattern, globOptions);
    
    return allFiles.filter(file => {
      const ext = path.extname(file).toLowerCase();
      const basename = path.basename(file).toLowerCase();
      
      // Incluir arquivos com extensões de texto conhecidas
      if (textExtensions.includes(ext)) {
        return true;
      }
      
      // Incluir arquivos sem extensão que são comumente texto
      if (!ext && (
        basename.includes('readme') ||
        basename.includes('license') ||
        basename.includes('changelog') ||
        basename.includes('makefile') ||
        basename.includes('dockerfile')
      )) {
        return true;
      }
      
      return false;
    });
  }

  getFileSize(filePath) {
    try {
      const stats = fs.statSync(filePath);
      return this.formatFileSize(stats.size);
    } catch (error) {
      return 'N/A';
    }
  }

  getFileModified(filePath) {
    try {
      const stats = fs.statSync(filePath);
      return stats.mtime.toISOString();
    } catch (error) {
      return 'N/A';
    }
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async searchInFile(filePath, pattern, options = {}) {
    const { ignoreCase = true, maxMatches = 10 } = options;
    
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const lines = content.split('\n');
      const regex = new RegExp(pattern, ignoreCase ? 'gi' : 'g');
      const matches = [];
      
      lines.forEach((line, index) => {
        if (matches.length >= maxMatches) return;
        
        if (regex.test(line)) {
          matches.push({
            line: index + 1,
            content: line.trim(),
            match: line.match(regex)
          });
        }
      });
      
      return matches;
      
    } catch (error) {
      throw new Error(`Erro ao buscar no arquivo ${filePath}: ${error.message}`);
    }
  }

  async findSimilarFiles(filePath, options = {}) {
    const { directory = path.dirname(filePath), maxResults = 10 } = options;
    
    const targetExt = path.extname(filePath);
    const targetName = path.basename(filePath, targetExt);
    
    try {
      const globPattern = path.join(directory, '**', `*${targetExt}`);
      const files = await glob(globPattern, {
        ignore: this.defaultIgnorePatterns,
        absolute: true,
        nodir: true
      });
      
      return files
        .filter(file => file !== filePath)
        .map(file => {
          const fileName = path.basename(file, path.extname(file));
          const similarity = this.calculateSimilarity(targetName, fileName);
          
          return {
            path: path.relative(directory, file),
            fullPath: file,
            similarity: similarity,
            size: this.getFileSize(file),
            modified: this.getFileModified(file)
          };
        })
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, maxResults);
        
    } catch (error) {
      throw new Error(`Erro ao buscar arquivos similares: ${error.message}`);
    }
  }

  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }
}

module.exports = FileSearcher;