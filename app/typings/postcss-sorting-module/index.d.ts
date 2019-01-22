declare module 'postcss-sorting' {
    import { Plugin } from 'postcss';

    export default function(options?: SortOptions): Plugin<any>;
}
