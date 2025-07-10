FROM node:20-slim

# Instala utilitário para aguardar DB
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

WORKDIR /home/node/app

# Copia apenas arquivos de dependência para otimizar cache
COPY package.json yarn.lock ./

# Instala dependências do projeto
RUN yarn global add @adonisjs/cli && yarn install --frozen-lockfile

# Copia o restante do projeto
COPY . .

# Torna o entrypoint executável
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Expõe a porta padrão do Adonis
EXPOSE 3333

ENTRYPOINT ["sh", "./entrypoint.sh"]
