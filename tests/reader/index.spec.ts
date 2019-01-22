import chai from 'chai';
import extra from 'fs-extra';
import mocha from 'mocha';
import path from 'path';
import Reader from '../../build/modules/reader';

interface Document {
    route: string;
    style: string;
}

mocha.describe('Read module', () => {
    const reader = new Reader();

    mocha.test('create instance', () => {
        chai.assert.instanceOf(reader, Reader);
    });

    mocha.describe('read method', () => {
        mocha.test('should return code if file is defined', () => {
            const actual: Document = {
                route: path.resolve(__dirname, 'document', 'index.css'),
                style: 'html {width: 100%;height: 100%}',
            };
            const expect: Document[] = [
                {
                    route: path.resolve(__dirname, 'document', 'index.css'),
                    style: 'html {width: 100%;height: 100%}',
                },
            ];

            extra.outputFile(actual.route, actual.style)
                .then(() => reader.read(actual.route))
                .then((documents: Document[]) => chai.assert.deepEqual(documents, expect))
                .then(() => extra.remove(path.dirname(actual.route)))
                .catch((error: Error) => chai.assert.isNull(error));
        });

        mocha.test('should throw error if file is undefined', () => {
            const source: string = 'undefined';

            reader.read(source)
                .then((document: Document[]) => chai.assert.isNull(document))
                .catch((error: Error) => chai.assert.isOk(error));
        });

        mocha.test('should return code if files are .css', () => {
            const actual: any = {
                routes: [
                    path.resolve(__dirname, 'css-only', 'index.css'),
                    path.resolve(__dirname, 'css-only', 'index.js'),
                ],
                styles: [
                    'html {width: 100%;height: 100%}',
                    'return 0;',
                ],
            };
            const expect: Document[] = [
                {
                    route: path.resolve(__dirname, 'css-only', 'index.css'),
                    style: 'html {width: 100%;height: 100%}',
                },
            ];

            actual.routes.forEach((route: string, index: number) => {
                extra.outputFile(route, actual.styles[index])
                    .then(() => reader.read(path.dirname(route)))
                    .then((documents: Document[]) => chai.assert.deepEqual(documents, expect))
                    .then(() => extra.remove(path.dirname(route)))
                    .catch((error: Error) => chai.assert.isNull(error));
            });
        });

        mocha.test('should return code if files are defined', () => {
            const actual: any = {
                routes: [
                    path.resolve(__dirname, 'documents', 'index1.css'),
                    path.resolve(__dirname, 'documents', 'index2.css'),
                ],
                styles: [
                    'html {width: 100%}',
                    'html {height: 100%}',
                ],
            };
            const expect: Document[] = [
                {
                    route: path.resolve(__dirname, 'documents', 'index1.css'),
                    style: 'html {width: 100%}',
                },
                {
                    route: path.resolve(__dirname, 'documents', 'index2.css'),
                    style: 'html {height: 100%}',
                },
            ];

            actual.routes.forEach((route: string, index: number) => {
                extra.outputFile(route, actual.styles[index])
                    .then(() => reader.read(path.dirname(route)))
                    .then((documents: Document[]) => chai.assert.deepEqual(documents, expect))
                    .then(() => extra.remove(path.dirname(route)))
                    .catch((error: Error) => chai.assert.isNull(error));
            });
        });

        mocha.test('should throw error if files are undefined', () => {
            const actual: any = {
                route: path.resolve(__dirname, 'undefined'),
            };

            reader.read(actual.route)
                .then((documents: Document[]) => chai.assert.isNull(documents))
                .catch((error: Error) => chai.assert.isOk(error));
        });
    });
});
