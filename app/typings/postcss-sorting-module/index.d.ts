interface SortOptions {
    order?: string[];
    'properties-order'?: string[];
    'unspecified-properties-position'?: string;
}

declare module 'postcss-sorting' {
    import { Plugin } from 'postcss';

    export default function(options?: SortOptions): Plugin<any>;
}
