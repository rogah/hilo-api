import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { httpConfiguration, yamlConfiguration } from './config';

import { AuthorizationMiddleware } from './middlewares';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [httpConfiguration, yamlConfiguration],
            isGlobal: true,
            cache: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthorizationMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        });
    }
}
