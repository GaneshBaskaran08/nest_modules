import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './Interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalInterceptors(new LoggingInterceptor()); // Globel level interceptor
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT') || 8000;
  await app.listen(port);
}
bootstrap();
