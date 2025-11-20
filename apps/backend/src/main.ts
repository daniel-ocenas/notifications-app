import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    methods: 'GET,PUT,PATCH,POST,DELETE',
  });

  const port = configService.get<string>('PORT') ?? 8080;
  await app.listen(port);

  Logger.log(`Server running on port ${port}`);
}
bootstrap();
