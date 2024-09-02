import { AppFactory } from 'libs/core/factories/app.factory'
import { UrlsModule } from './urls.module'

async function bootstrap() {
  const app = await AppFactory.create(UrlsModule)

  await app.listen(3000, '0.0.0.0')
}
bootstrap()
