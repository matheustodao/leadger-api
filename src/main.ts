import 'dotenv/config';
import '@core/prisma/prisma.config'

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { onSetupDocApi } = InitConfigDocApi()

  onSetupDocApi(app)

  await app.listen(process.env.PORT ?? 3000);
}

function InitConfigDocApi() {
  const config = new DocumentBuilder()
    .setTitle('Leader Api')
    .setVersion('v0.0.1')
    .build()

  return {
    onSetupDocApi: (app: INestApplication) => {
      const doc = SwaggerModule.createDocument(app, config)
      SwaggerModule.setup(
        'docs/swagger',
        app,
        doc
      )

      app.use(
        '/docs/scalar',
        apiReference({
          url: '/openapi.json',
          darkMode: true,
          theme: 'deepSpace'
        }),
      )
    }
  }
}

await bootstrap();
