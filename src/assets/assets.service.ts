import { Injectable } from '@nestjs/common';
import { Asset } from '../graphql.schema';

import { randomUUID } from 'crypto';

@Injectable()
export class AssetsService {
    private readonly assets: Array<Asset> = [
        { id: randomUUID(), name: 'BITCOIN' },
    ];

    findAll(): Asset[] {
        return this.assets;
    }

    findOneById(id: string): Asset {
        return this.assets.find((asset) => asset.id === id);
    }
}
