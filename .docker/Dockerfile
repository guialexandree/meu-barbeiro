FROM node:22.15-alpine AS builder

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos necessários para o build
COPY vite.config.ts ./
COPY package*.json ./
COPY *.json ./
COPY . .

# Instalar as dependências
RUN npm install

# Expor a porta 80
EXPOSE 8080

# Comando para iniciar o Nginx
CMD ["npm", "start"]