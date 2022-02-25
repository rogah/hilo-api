import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { AssetsConnection } from './models/asset.connection';
import { Asset } from './models/asset.model';

@Injectable()
export class AssetsService {
    private readonly assets: Array<Asset> = [
        { id: '188ff1d2-d961-47e7-899b-acc192a3fc7d', ticket: 'BITCOIN' },
    ];

    findAll(): Asset[] {
        return this.assets;
    }

    findOneById(id: string): Asset {
        return this.assets.find(asset => asset.id === id);
    }

    async findAndPaginate(): Promise<AssetsConnection> {
        return Promise.resolve({
            edges: this.assets.map((asset: Asset) => ({
                cursor: randomUUID(),
                node: asset,
            })),
        });
    }
}
