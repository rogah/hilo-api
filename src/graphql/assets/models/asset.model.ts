import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Node } from '../../nodes/models/node.model';

@ObjectType({ implements: Node })
export class Asset implements Node {
    @Field(_type => ID, { name: 'id' })
    id: string;

    @Field({ nullable: true })
    ticket?: string;
}
