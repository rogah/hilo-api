import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { httpConfiguration, yamlConfiguration } from './config';
import { AuthorizationMiddleware } from './middlewares';
import { GraphqlModule } from './graphql';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [httpConfiguration, yamlConfiguration],
            isGlobal: true,
            cache: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.graphql',
        }),
        GraphqlModule,
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
