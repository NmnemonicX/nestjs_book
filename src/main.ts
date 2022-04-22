import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bookExceptionFilter } from './exсeption_filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new bookExceptionFilter());

  await app.listen(3000);
}
bootstrap();
