import {ValidationPipe} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {NestExpressApplication} from '@nestjs/platform-express'
import * as helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )
  app.enableCors(), 
  app.use(helmet()),
  await app.listen(3000, '0.0.0.0')
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
