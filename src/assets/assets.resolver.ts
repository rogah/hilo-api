import { Resolver, Query } from '@nestjs/graphql';

import { Asset } from './models/asset.model';
import { AssetsService } from './assets.service';
import { AssetsConnection } from './models/asset.connection';

@Resolver(of => Asset)
export class AssetsResolver {
    constructor(private readonly assetsService: AssetsService) {}

    @Query(returns => AssetsConnection, { nullable: true })
    async assets(): Promise<AssetsConnection> {
        return this.assetsService.findAndPaginate();
    }
}
