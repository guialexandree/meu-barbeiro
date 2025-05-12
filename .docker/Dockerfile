FROM node:22.15-alpine AS builder

# Definir o diretório de trabalho
WORKDIR /appweb

# Copiar os arquivos necessários para o build
COPY package.json package-lock.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY ./src ./src
COPY ./public ./public

# Instalar as dependências
RUN npm install

# Gerar o build do frontend
RUN npm run build

# Etapa 2: Servir os arquivos estáticos
FROM nginx:stable-alpine

# Copiar os arquivos do build para o Nginx
COPY --from=builder /appweb/dist /usr/share/nginx/html

# Configurar o Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]