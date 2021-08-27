import {ValidationPipe} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import fastifyCookie from 'fastify-cookie'
import fastifyCsrf from 'fastify-csrf'
import fastifyHelmet from 'fastify-helmet'
import {AppModule} from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    cors: true
  })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )
  await app.register(fastifyHelmet)
  await app.register(fastifyCookie)
  await app.register(fastifyCsrf)
  await app.listen(3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
