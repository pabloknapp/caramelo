<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=100&color=fc9700ff"/>

# Chef Caramelo

O **Chef Caramelo**, é um assistente culinário baseado em inteligência artificial, desenvolvido com Node.js + API do OpenRouter. Ele assume a persona de um cachorro vira-lata caramelo e sugere receitas culinárias de forma descontraída conforme a necessidade do usuário, com informações sobre tempo de preparo, lista de ingredientes, modo de preparo, curiosidades sobre o prato e a dica de ouro do Chef para o preparo da receita.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- Node.js (versão 18 ou superior recomendada)
- Gerenciador de pacotes npm (instalado automaticamente com o Node.js)
- Uma chave de API do OpenRouter

## Instalação

1. Clone os arquivos do projeto para o seu ambiente local.
   ```bash
   git clone https://github.com/pabloknapp/caramelo.git
   ```
2. Abra o terminal na pasta raiz do projeto.
   ```bash
   cd caramelo 
   ```
3. Execute o comando abaixo para instalar as dependências necessárias:
   ```bash
   npm install
   ```

### Configuração

1. Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`. Você pode fazer isso copiando o arquivo:
   ```bash
   cp .env.example .env
   ```
2. Abra o arquivo `.env` e insira sua chave de API do OpenRouter na variável `OPENROUTER_API_KEY`:
   ```env
   OPENROUTER_API_KEY=chave_aqui
   ```

### Execução

1. Para iniciar o servidor local, execute o seguinte comando no terminal:
   ```bash
   npm start
   ```

## Autor

[Pablo Knapp](https://github.com/pabloknapp)

## Licença

MIT. Use à vontade, compartilhe livremente.

<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=fc9700ff&height=100&section=footer"/>