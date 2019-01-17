import extra, { Stats } from 'fs-extra';
import path from 'path';

export default class implements Reader {
    private isCss(routes: string): boolean {
        return path.extname(routes) === '.css';
    }

    private getResolvedCssRoute(source: string): string | null {
        return this.isCss(source) ? path.resolve(source) : null;
    }

    private resolveReducer(source: string, routes: string[]): string[] {
        return routes.reduce((store: string[], route: string) => {
            const combine: string = path.join(source, route);
            const resolve: string | null = this.getResolvedCssRoute(combine);

            if (resolve) {
                store.push(resolve);
            }

            return store;
        }, []);
    }

    private getResolvedCssRoutes(source: string, routes: string[]): string[] | null {
        const resolves: string[] = this.resolveReducer(source, routes);

        return resolves.length ? resolves : null;
    }

    private getReadablePromises(routes: string[]): Array<Promise<string>> {
        return routes.map((route: string) => extra.readFile(route, { encoding: 'utf8' }));
    }

    private async getDocument(source: string): Promise<Document[]> {
        const resolve: string | null = this.getResolvedCssRoute(source);

        if (resolve) {
            const style: string = await extra.readFile(resolve, { encoding: 'utf8' });

            return [{ route: resolve, style }];
        }

        throw new TypeError(`File does\`t have '.css' extension ${source}`);
    }

    private async getDocuments(source: string): Promise<Document[]> {
        const essences: string[] = await extra.readdir(source);
        const resolves: string[] | null = this.getResolvedCssRoutes(source, essences);

        if (Array.isArray(resolves) && resolves.length) {
            const promises: Array<Promise<string>> = this.getReadablePromises(resolves);
            const styles: string[] = await Promise.all(promises);

            return styles.map((style: string, index: number) => {
                return { route: resolves[index], style };
            });
        }

        throw new TypeError(`File with '.css' extension not found in directory ${source}`);
    }

    public async read(source: string): Promise<Document[]> {
        const route: string = path.resolve(source);
        const stat: boolean | Stats = (await extra.pathExists(route)) && (await extra.stat(route));

        if (stat && stat.isFile()) {
            return this.getDocument(route);
        } else if (stat && stat.isDirectory()) {
            return this.getDocuments(route);
        }

        throw new TypeError(`No such file or directory ${route}`);
    }
}
