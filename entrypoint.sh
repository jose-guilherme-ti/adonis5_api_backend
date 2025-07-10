#!/bin/sh

echo "⌛ Aguardando o banco de dados ($DB_HOST:$DB_PORT) ficar disponível..."

while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "✅ Banco de dados disponível!"

# Garante que o manifest está atualizado
echo "🔧 Gerando manifest..."
node ace generate:manifest

# Executa as migrations
echo "📦 Executando migrations..."
node ace migration:run --force

# Inicia o servidor em modo dev (ou use `start` em prod)
echo "🚀 Iniciando servidor AdonisJS..."
node ace serve --watch
