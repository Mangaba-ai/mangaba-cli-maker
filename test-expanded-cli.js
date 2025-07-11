#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const CLI_PATH = path.join(__dirname, 'src', 'cli.js');

function runCommand(args, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n🧪 Testando: ${description}`);
    console.log(`📝 Comando: node src/cli.js ${args.join(' ')}`);
    
    const child = spawn('node', [CLI_PATH, ...args], {
      stdio: 'pipe',
      cwd: __dirname
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      console.log(`📊 Código de saída: ${code}`);
      
      if (stdout) {
        console.log(`✅ Saída:`);
        console.log(stdout);
      }
      
      if (stderr) {
        console.log(`❌ Erro:`);
        console.log(stderr);
      }
      
      console.log('─'.repeat(60));
      resolve({ code, stdout, stderr });
    });
    
    child.on('error', (error) => {
      console.log(`💥 Erro de execução: ${error.message}`);
      reject(error);
    });
  });
}

async function testCLI() {
  console.log('🚀 Iniciando testes do Mangaba CLI expandido\n');
  console.log('=' .repeat(60));
  
  const tests = [
    {
      args: ['--version'],
      description: 'Verificar versão'
    },
    {
      args: ['--help'],
      description: 'Mostrar ajuda geral'
    },
    {
      args: ['list'],
      description: 'Listar APIs configuradas'
    },
    {
      args: ['task', '--help'],
      description: 'Ajuda do comando task'
    },
    {
      args: ['search', '--help'],
      description: 'Ajuda do comando search'
    },
    {
      args: ['web', '--help'],
      description: 'Ajuda do comando web'
    },
    {
      args: ['code', '--help'],
      description: 'Ajuda do comando code'
    },
    {
      args: ['memory', '--help'],
      description: 'Ajuda do comando memory'
    },
    {
      args: ['stats'],
      description: 'Mostrar estatísticas'
    },
    {
      args: ['tools'],
      description: 'Descobrir ferramentas disponíveis'
    },
    {
      args: ['search', '*.js', '--type', 'file'],
      description: 'Buscar arquivos JavaScript'
    },
    {
      args: ['web', 'Node.js best practices', '--max', '3'],
      description: 'Busca web simulada'
    }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const result = await runCommand(test.args, test.description);
      
      if (result.code === 0) {
        passed++;
        console.log(`✅ PASSOU`);
      } else {
        failed++;
        console.log(`❌ FALHOU (código ${result.code})`);
      }
    } catch (error) {
      failed++;
      console.log(`💥 ERRO: ${error.message}`);
    }
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('📊 RESUMO DOS TESTES');
  console.log('=' .repeat(60));
  console.log(`✅ Testes que passaram: ${passed}`);
  console.log(`❌ Testes que falharam: ${failed}`);
  console.log(`📈 Taxa de sucesso: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 Todos os testes passaram! O CLI está funcionando corretamente.');
  } else {
    console.log('\n⚠️  Alguns testes falharam. Verifique os erros acima.');
  }
}

// Executar testes
testCLI().catch(error => {
  console.error('💥 Erro fatal nos testes:', error);
  process.exit(1);
});