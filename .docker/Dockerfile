FROM node:22.15-alpine AS builder

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos necessários para o build
COPY vite.config.ts ./
COPY package*.json ./
COPY *.conf ./
COPY *.json ./
COPY . .

# Instalar as dependências
RUN npm install

# Gerar o build do frontend
RUN npm run build

# Etapa 2: Servir os arquivos estáticos
FROM nginx:alpine

# Copiar os arquivos do build para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 8080

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]