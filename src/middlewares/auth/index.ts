import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import firebaseAdmin, { app } from 'firebase-admin';

import { FirebaseConfiguration } from '../../config';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    private readonly logger = new Logger(AuthorizationMiddleware.name);

    private defaultApp: app.App;

    constructor(private configService: ConfigService) {
        const firebaseConfiguration =
            configService.get<FirebaseConfiguration>('firebase');
        this.defaultApp = firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(
                firebaseConfiguration.admin,
            ),
        });
    }

    use(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;
        if (authorization) {
            const idToken = authorization.replace('Bearer ', '');
            this.defaultApp
                .auth()
                .verifyIdToken(idToken)
                .then(async (decodedToken) => {
                    const user = {
                        email: decodedToken?.email,
                    };
                    req['user'] = user;
                    next();
                })
                .catch((error) => {
                    this.logger.error(error);
                    this.accessDenied(req.url, res);
                });
        } else {
            next();
        }
    }

    private accessDenied(url: string, res: Response) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'Access Denied',
        });
    }
}
