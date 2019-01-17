import postcss, { AcceptedPlugin, LazyResult } from 'postcss';
import longhand from 'postcss-merge-longhand';
import sorting from 'postcss-sorting';
import Reader from './modules/reader';
import Writer from './modules/writer';
import discard from './plugins/discard-duplicates';

export default class {
    private readonly plugins: AcceptedPlugin[];
    private readonly reader: Reader;
    private readonly writer: Writer;

    public constructor(options: TimberOptions) {
        this.reader = new Reader();
        this.writer = new Writer();
        this.plugins = [discard, longhand, sorting(options.sort)];
    }

    private stylesReducer(documents: Document[]): Document[] {
        return documents.map((document: Document) => {
            const result: LazyResult = postcss(this.plugins).process(document.style);

            document.style = result.css;

            return document;
        });
    }

    public clean(source: string): Promise<void> {
        return this.reader
            .read(source)
            .then((documents: Document[]) => this.stylesReducer(documents))
            .then((documents: Document[]) => this.writer.write(documents));
    }
}
