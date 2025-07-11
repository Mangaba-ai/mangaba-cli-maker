#!/usr/bin/env node

/**
 * Script de exemplo para testar o Mangaba CLI
 * Execute: node examples/test-cli.js
 */

const { spawn } = require('child_process');
const path = require('path');

const cliPath = path.join(__dirname, '..', 'src', 'cli.js');

console.log('🧪 Testando Mangaba CLI...');
console.log('📍 Caminho do CLI:', cliPath);
console.log();

// Teste 1: Verificar versão
console.log('1️⃣ Testando comando --version');
const versionProcess = spawn('node', [cliPath, '--version'], { stdio: 'inherit' });

versionProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Comando --version funcionou!');
  } else {
    console.log('❌ Erro no comando --version');
  }
  
  console.log();
  
  // Teste 2: Verificar help
  console.log('2️⃣ Testando comando --help');
  const helpProcess = spawn('node', [cliPath, '--help'], { stdio: 'inherit' });
  
  helpProcess.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Comando --help funcionou!');
    } else {
      console.log('❌ Erro no comando --help');
    }
    
    console.log();
    
    // Teste 3: Verificar comando list
    console.log('3️⃣ Testando comando list');
    const listProcess = spawn('node', [cliPath, 'list'], { stdio: 'inherit' });
    
    listProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Comando list funcionou!');
      } else {
        console.log('❌ Erro no comando list');
      }
      
      console.log();
      console.log('🎉 Testes concluídos!');
      console.log('💡 Para configurar APIs, execute: node src/cli.js config');
      console.log('💡 Para executar tarefas, execute: node src/cli.js task');
    });
  });
});