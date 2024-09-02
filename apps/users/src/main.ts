import { AppFactory } from 'libs/core/factories/app.factory'
import { UsersModule } from './users.module'

async function bootstrap() {
  const app = await AppFactory.create(UsersModule)
  await app.listen(3000)
}
bootstrap()
