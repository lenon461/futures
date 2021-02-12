import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      // transform: true,
      // forbidNonWhitelisted: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    })
  )

  const options = new DocumentBuilder()
    .setTitle('Futures')
    .setDescription('Futures API description :>')
    .setVersion('1.0')
    .addTag('summoners')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.enableCors()
  await app.listen(5002)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
