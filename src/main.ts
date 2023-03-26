import 'reflect-metadata';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './logical/validate/validationPipe';
import { JwtAuthGuard } from './logical/auth/JwtAuthGuard';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http'
import * as https from 'https'
const httpsOptions = {
  key: readFileSync(join(process.cwd(), 'ssl.key')),
  cert: readFileSync(join(process.cwd(), 'ssl.pem')),
}
async function bootstrap() {
  const server = express()
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  await app.init();
  http.createServer(server).listen(3010);
  https.createServer(httpsOptions, server).listen(443);
}
bootstrap();
