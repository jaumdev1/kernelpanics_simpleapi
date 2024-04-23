# Use a imagem oficial do Node.js 17 como base
FROM node:20

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json (se disponível) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta que o app usa
EXPOSE 4000

# Comando para iniciar a aplicação
CMD [ "node", "index.js" ]