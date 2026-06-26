# Chef Caramelo

Este projeto é um assistente culinário baseado em inteligência artificial que utiliza a persona de um cachorro vira-lata caramelo para sugerir receitas de forma descontraída.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- Node.js (versão 18 ou superior recomendada)
- Gerenciador de pacotes npm (instalado automaticamente com o Node.js)
- Uma chave de API do OpenRouter

## Instalação

1. Baixe ou clone os arquivos do projeto para o seu ambiente local.
2. Abra o terminal na pasta raiz do projeto.
3. Execute o comando abaixo para instalar as dependências necessárias:
   ```bash
   npm install
   ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`. Você pode fazer isso copiando o arquivo:
   ```bash
   cp .env.example .env
   ```
2. Abra o arquivo `.env` e insira sua chave de API do OpenRouter na variável `OPENROUTER_API_KEY`:
   ```env
   OPENROUTER_API_KEY=chave_aqui
   ```

## Execução

1. Para iniciar o servidor local, execute o seguinte comando no terminal:
   ```bash
   npm start
   ```
2. Após o servidor iniciar, abra o seu navegador e acesse o seguinte endereço para interagir com a interface:
   ```
   http://localhost:3000
   ```
