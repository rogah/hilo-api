import { Resolver, Query, Args } from '@nestjs/graphql';
import { Asset } from '../graphql.schema';
import { AssetsService } from './assets.service';

@Resolver(Asset)
export class AssetsResolver {
    constructor(private readonly assetsService: AssetsService) {}

    @Query('assets')
    async getCats() {
        return this.assetsService.findAll();
    }

    @Query('asset')
    async findOneById(@Args('id') id: string): Promise<Asset> {
        return this.assetsService.findOneById(id);
    }
}
