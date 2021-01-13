import { Sys } from 'contentful';

interface Asset {
    sys: Sys;
    title: string;
    description: string;
    contentType: string;
    fileName: string;
    url: string;
    size: number;
    width: number;
    height: number;
    linkedFrom: String;
}

export interface AssetCollection {
    assetCollection: {
        items: Asset[];
    };
}
