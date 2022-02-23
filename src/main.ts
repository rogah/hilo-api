import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { HttpConfiguration } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const httpConfig = configService.get<HttpConfiguration>('http');

    await app.listen(httpConfig.port);

    app.getUrl().then((url) => {
        console.log(`Server is listening on ${url}`);
    });
}
bootstrap();
