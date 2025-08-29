# Use Node.js oficial
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production --silent

# Instalar dependências de desenvolvimento para build
RUN npm ci --silent

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Instalar serve globalmente para servir os arquivos
RUN npm install -g serve

# Criar usuário não-root por segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Mudar ownership dos arquivos
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expor porta
EXPOSE 3000

# Comando para iniciar - serve a pasta dist
CMD ["serve", "-s", "dist", "-l", "3000"]
