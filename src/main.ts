import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { HttpConfiguration } from './config';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    const configService = app.get(ConfigService);
    const httpConfig = configService.get<HttpConfiguration>('http');

    await app.listen(httpConfig.port);

    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
