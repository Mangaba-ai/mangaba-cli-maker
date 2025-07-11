const axios = require('axios');
const cheerio = require('cheerio');

class WebSearcher {
  constructor() {
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    this.timeout = 10000; // 10 segundos
  }

  async search(query, options = {}) {
    const { maxResults = 5, url = null } = options;
    
    if (url) {
      return await this.fetchUrl(url);
    }
    
    try {
      // Usar DuckDuckGo como motor de busca (não requer API key)
      const results = await this.searchDuckDuckGo(query, maxResults);
      return results;
    } catch (error) {
      throw new Error(`Erro na pesquisa web: ${error.message}`);
    }
  }

  async searchDuckDuckGo(query, maxResults = 5) {
    try {
      // Primeira requisição para obter o token
      const tokenResponse = await axios.get('https://duckduckgo.com/', {
        headers: { 'User-Agent': this.userAgent },
        timeout: this.timeout
      });
      
      const $ = cheerio.load(tokenResponse.data);
      const vqd = $('input[name="vqd"]').attr('value') || '';
      
      // Segunda requisição para buscar resultados
      const searchUrl = 'https://links.duckduckgo.com/d.js';
      const params = {
        q: query,
        kl: 'br-pt',
        l: 'br',
        p: '',
        s: '0',
        df: '',
        vqd: vqd,
        o: 'json',
        sp: '0'
      };
      
      const searchResponse = await axios.get(searchUrl, {
        params: params,
        headers: { 
          'User-Agent': this.userAgent,
          'Referer': 'https://duckduckgo.com/'
        },
        timeout: this.timeout
      });
      
      const results = this.parseDuckDuckGoResults(searchResponse.data, maxResults);
      return results;
      
    } catch (error) {
      // Fallback para busca simulada se DuckDuckGo falhar
      console.warn('DuckDuckGo indisponível, usando busca simulada');
      return this.simulatedSearch(query, maxResults);
    }
  }

  parseDuckDuckGoResults(data, maxResults) {
    try {
      const jsonData = JSON.parse(data.replace(/^ddg_spice_web_search\(/, '').replace(/\);?$/, ''));
      const results = [];
      
      if (jsonData && jsonData.results) {
        for (let i = 0; i < Math.min(jsonData.results.length, maxResults); i++) {
          const result = jsonData.results[i];
          results.push({
            title: this.cleanText(result.t || 'Sem título'),
            url: result.u || '',
            snippet: this.cleanText(result.a || 'Sem descrição'),
            source: 'DuckDuckGo'
          });
        }
      }
      
      return results;
    } catch (error) {
      throw new Error('Erro ao processar resultados da busca');
    }
  }

  simulatedSearch(query, maxResults) {
    // Busca simulada para demonstração quando APIs reais não estão disponíveis
    const simulatedResults = [
      {
        title: `Resultados para: ${query}`,
        url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        snippet: `Esta é uma busca simulada para "${query}". Para resultados reais, configure uma API de busca.`,
        source: 'Simulado'
      },
      {
        title: `${query} - Wikipedia`,
        url: `https://pt.wikipedia.org/wiki/${encodeURIComponent(query)}`,
        snippet: `Artigo da Wikipedia sobre ${query}. Fonte confiável de informações.`,
        source: 'Simulado'
      },
      {
        title: `${query} - Stack Overflow`,
        url: `https://stackoverflow.com/search?q=${encodeURIComponent(query)}`,
        snippet: `Discussões e soluções sobre ${query} na comunidade Stack Overflow.`,
        source: 'Simulado'
      }
    ];
    
    return simulatedResults.slice(0, maxResults);
  }

  async fetchUrl(url) {
    try {
      const response = await axios.get(url, {
        headers: { 'User-Agent': this.userAgent },
        timeout: this.timeout,
        maxRedirects: 5
      });
      
      const contentType = response.headers['content-type'] || '';
      
      if (contentType.includes('application/json')) {
        return {
          type: 'json',
          url: url,
          data: response.data,
          size: JSON.stringify(response.data).length
        };
      } else if (contentType.includes('text/html')) {
        const $ = cheerio.load(response.data);
        
        // Extrair informações principais da página
        const title = $('title').text().trim() || 'Sem título';
        const description = $('meta[name="description"]').attr('content') || 
                          $('meta[property="og:description"]').attr('content') || 
                          'Sem descrição';
        
        // Extrair texto principal (remover scripts, estilos, etc.)
        $('script, style, nav, header, footer, aside').remove();
        const mainText = $('body').text().replace(/\s+/g, ' ').trim();
        
        return {
          type: 'html',
          url: url,
          title: this.cleanText(title),
          description: this.cleanText(description),
          content: mainText.substring(0, 5000), // Limitar a 5000 caracteres
          size: response.data.length
        };
      } else {
        return {
          type: 'other',
          url: url,
          contentType: contentType,
          size: response.data.length,
          data: response.data.toString().substring(0, 1000)
        };
      }
      
    } catch (error) {
      throw new Error(`Erro ao buscar URL ${url}: ${error.message}`);
    }
  }

  async searchNews(query, options = {}) {
    const { maxResults = 5, language = 'pt' } = options;
    
    try {
      // Buscar notícias usando DuckDuckGo News
      const newsUrl = 'https://duckduckgo.com/news.js';
      const params = {
        q: query,
        l: language,
        o: 'json',
        s: '0',
        p: '1',
        api: 'd.js'
      };
      
      const response = await axios.get(newsUrl, {
        params: params,
        headers: { 'User-Agent': this.userAgent },
        timeout: this.timeout
      });
      
      return this.parseNewsResults(response.data, maxResults);
      
    } catch (error) {
      throw new Error(`Erro na busca de notícias: ${error.message}`);
    }
  }

  parseNewsResults(data, maxResults) {
    try {
      const results = [];
      
      // Implementar parsing específico para notícias
      // Por enquanto, retornar resultados simulados
      for (let i = 0; i < maxResults; i++) {
        results.push({
          title: `Notícia ${i + 1} sobre a busca`,
          url: `https://example.com/news/${i + 1}`,
          snippet: 'Conteúdo da notícia...',
          publishedAt: new Date().toISOString(),
          source: 'Fonte da Notícia'
        });
      }
      
      return results;
    } catch (error) {
      throw new Error('Erro ao processar resultados de notícias');
    }
  }

  async searchImages(query, options = {}) {
    const { maxResults = 5, safeSearch = true } = options;
    
    // Implementação básica para busca de imagens
    const imageResults = [];
    
    for (let i = 0; i < maxResults; i++) {
      imageResults.push({
        title: `Imagem ${i + 1} - ${query}`,
        url: `https://example.com/image${i + 1}.jpg`,
        thumbnailUrl: `https://example.com/thumb${i + 1}.jpg`,
        width: 800,
        height: 600,
        source: 'Fonte da Imagem'
      });
    }
    
    return imageResults;
  }

  cleanText(text) {
    if (!text) return '';
    
    return text
      .replace(/\s+/g, ' ')
      .replace(/[\r\n\t]/g, ' ')
      .trim();
  }

  async checkUrlStatus(url) {
    try {
      const response = await axios.head(url, {
        headers: { 'User-Agent': this.userAgent },
        timeout: 5000,
        maxRedirects: 5
      });
      
      return {
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers['content-type'],
        contentLength: response.headers['content-length'],
        lastModified: response.headers['last-modified'],
        accessible: true
      };
      
    } catch (error) {
      return {
        status: error.response?.status || 0,
        statusText: error.message,
        accessible: false,
        error: error.message
      };
    }
  }

  extractLinks(htmlContent, baseUrl = '') {
    const $ = cheerio.load(htmlContent);
    const links = [];
    
    $('a[href]').each((index, element) => {
      const href = $(element).attr('href');
      const text = $(element).text().trim();
      
      if (href && text) {
        let fullUrl = href;
        
        // Converter URLs relativas em absolutas
        if (href.startsWith('/') && baseUrl) {
          fullUrl = new URL(href, baseUrl).toString();
        } else if (!href.startsWith('http') && baseUrl) {
          fullUrl = new URL(href, baseUrl).toString();
        }
        
        links.push({
          text: this.cleanText(text),
          url: fullUrl,
          isExternal: !fullUrl.includes(new URL(baseUrl || 'http://example.com').hostname)
        });
      }
    });
    
    return links;
  }

  async searchSimilarSites(url) {
    try {
      const domain = new URL(url).hostname;
      const query = `site similar to ${domain}`;
      
      const results = await this.search(query, { maxResults: 5 });
      
      return results.map(result => ({
        ...result,
        similarity: 'similar',
        originalDomain: domain
      }));
      
    } catch (error) {
      throw new Error(`Erro ao buscar sites similares: ${error.message}`);
    }
  }
}

module.exports = WebSearcher;