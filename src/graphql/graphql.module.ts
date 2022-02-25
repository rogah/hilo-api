import { Module } from '@nestjs/common';

import { AssetsModule } from './assets';

@Module({
    imports: [AssetsModule],
})
export class GraphqlModule {}
