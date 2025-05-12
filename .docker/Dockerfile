FROM node:22.15-alpine AS builder

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos necessários para o build
COPY vite.config.ts ./
COPY package*.json ./
COPY *.json ./
COPY . .

RUN ls -l /app

# Instalar as dependências
RUN npm install

# Gerar o build do frontend
RUN npm run build

# Etapa 2: Servir os arquivos estáticos
FROM nginx:stable-alpine

# Copiar os arquivos do build para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]