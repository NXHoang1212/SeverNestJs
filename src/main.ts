import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { FastifyAdapter, NestFastifyApplication, } from '@nestjs/platform-fastify';
import { LazyModuleLoader } from '@nestjs/core';
import { MyLogger } from './middleware/logger/Logger.App';
import * as compression from 'compression';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  // const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useLogger(new MyLogger());
  app.useStaticAssets(join(__dirname, '..', 'src/views/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');
  app.enableCors();
  app.get(LazyModuleLoader);
  app.use(compression());
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
