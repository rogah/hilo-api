import { Module } from '@nestjs/common';

import { AssetsResolver } from './assets.resolver';
import { AssetsService } from './assets.service';

@Module({
    providers: [AssetsService, AssetsResolver],
})
export class AssetsModule {}
