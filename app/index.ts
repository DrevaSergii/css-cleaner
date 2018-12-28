import { promises as fs } from 'fs';
import { Plugin, Result } from 'postcss';
import * as postcss from 'postcss';
import * as longhand from 'postcss-merge-longhand';
import * as sorting from 'postcss-sorting';
import * as discard from './plugins/discard-duplicates';

export default class implements Timber {
    private readonly plugins: Array<Plugin<any>>;

    constructor(options: TimberOptions) {
        this.plugins = [discard, longhand, sorting(options.sort)];
    }

    public clean(options: CleanOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.readFile(options.from, { encoding: 'utf8' })
                .then((styles: string) => postcss(this.plugins).process(styles, options))
                .then((result: Result) => fs.writeFile(options.to || options.from, result.css))
                .then(() => resolve())
                .catch((error: any) => reject(error));
        });
    }
}
