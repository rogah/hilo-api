import { ObjectType } from '@nestjs/graphql';

import { ConnectionType } from '../../nodes/models';
import { Asset } from './asset.model';

@ObjectType()
export class AssetsConnection extends ConnectionType(Asset) {}
