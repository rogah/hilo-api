
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Asset {
    id: string;
    name: string;
}

export abstract class IQuery {
    abstract assets(): Nullable<Nullable<Asset>[]> | Promise<Nullable<Nullable<Asset>[]>>;

    abstract asset(id: string): Nullable<Asset> | Promise<Nullable<Asset>>;
}

type Nullable<T> = T | null;
