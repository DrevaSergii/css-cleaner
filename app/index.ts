import { promises as fs } from 'fs';
import * as postcss from 'postcss';
import * as longhand from 'postcss-merge-longhand';
import * as sorting from 'postcss-sorting';

export default class implements Timber {
    private readonly options: ITimberOptions;
    private readonly plugins: any[];

    constructor(options: ITimberOptions) {
        this.options = options;

        this.plugins = [longhand, sorting(this.options.sort)];
    }

    public clean(options: ICleanOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.readFile(options.from, { encoding: 'utf8' })
                .then((styles: string) => postcss(this.plugins).process(styles, options))
                .then(({ css }) => fs.writeFile(options.to || options.from, css))
                .then(() => resolve())
                .catch((error: any) => reject(error));
        });
    }
}
