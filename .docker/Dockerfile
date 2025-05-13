FROM node:18-alpine AS build

WORKDIR /app

# Copia os arquivos do projeto
COPY package*.json ./
COPY vite.config.* ./
COPY . .

# Instala as dependências e faz o build
RUN npm install
RUN npm run build

# Etapa 2: Servir com nginx
FROM nginx:alpine

# Remove configuração default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build para o nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração customizada do nginx (opcional)
COPY .docker/nginx.conf /etc/nginx/nginx.conf

# Expõe a porta
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]