import { InterfaceType, Field, ID } from '@nestjs/graphql';

export interface INode {
    id: string;
}

@InterfaceType()
export abstract class Node implements INode {
    @Field(_type => ID, { name: 'id' })
    id: string;
}
