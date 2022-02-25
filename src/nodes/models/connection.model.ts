import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { IEdgeType } from './edge.model';

export interface IConnectionType<T> {
    edges?: IEdgeType<T>[];
}

export function ConnectionType<T>(classRef: Type<T>): Type<IConnectionType<T>> {
    @ObjectType(`${classRef.name}Edge`)
    abstract class Edge implements IEdgeType<T> {
        @Field(type => String)
        cursor: string;

        @Field(type => classRef, { nullable: true })
        node?: T;
    }

    @ObjectType({ isAbstract: true })
    abstract class Conneciton implements IConnectionType<T> {
        @Field(type => [Edge], { nullable: 'itemsAndList' })
        edges?: Edge[];
    }

    return Conneciton as Type<IConnectionType<T>>;
}
