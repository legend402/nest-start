import 'reflect-metadata';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './logical/validate/validationPipe';
import { JwtAuthGuard } from './logical/auth/JwtAuthGuard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  await app.listen(3010);
}
bootstrap();
