import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('rhinobyte API')
    .setDescription('The rhinobyte API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(
    app.get(ConfigService).get('APPLICATION_PORT') ?? 3000,
    () => {
      console.log(
        'Sever console log.',
        app.get(ConfigService).get('APPLICATION_PORT'),
      );
    },
  );
}
bootstrap();
