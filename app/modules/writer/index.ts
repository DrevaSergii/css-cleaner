import extra from 'fs-extra';
import { Writer, Document } from '../../typings/css-cleaner';

export default class implements Writer {
    private getPromiseFiles(documents: Document[]): Array<Promise<void>> {
        return documents.map((document: Document) => extra.outputFile(document.route, document.style));
    }

    public write(documents: Document[]): Promise<void> {
        const promises: Array<Promise<void>> = this.getPromiseFiles(documents);

        return Promise.all(promises).then(() => Promise.resolve());
    }
}
