import User from 'App/Models/User'

export default {
  guard: 'api',
  guards: {
    api: {
      driver: 'oat',
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'user_id',
      },
      provider: {
        driver: 'lucid',
        model: User, // <-- aqui deve ser a classe importada diretamente
      },
    },
  },
}