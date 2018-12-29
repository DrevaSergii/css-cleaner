import * as fs from 'fs';
import * as postcss from 'postcss';
import * as longhand from 'postcss-merge-longhand';
import * as sorting from 'postcss-sorting';
import * as discard from './plugins/discard-duplicates';

export default class implements Timber {
    private readonly plugins: Array<postcss.Plugin<any>>;

    constructor(options: TimberOptions) {
        this.plugins = [discard, longhand, sorting(options ? options.sort : {})];
    }

    public clean(options: CleanOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.promises.readFile(options.from, { encoding: 'utf8' })
                .then((styles: string) => postcss(this.plugins).process(styles, options))
                .then((result: postcss.Result) => fs.promises.writeFile(options.to || options.from, result.css))
                .then(() => resolve())
                .catch((error: any) => reject(error));
        });
    }
}
