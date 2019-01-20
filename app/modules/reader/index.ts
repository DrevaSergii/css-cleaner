import extra, { Stats } from 'fs-extra';
import path from 'path';

export default class implements Reader {
    private isCss(routes: string): boolean {
        return path.extname(routes) === '.css';
    }

    private getCssRoute(source: string): string | null {
        return this.isCss(source) ? path.resolve(source) : null;
    }

    private reduceCssRoutes(source: string[]): string[] {
        return source.reduce((store: string[], route: string) => {
            const cssRoute: string | null = this.getCssRoute(route);

            if (cssRoute) {
                store.push(cssRoute);
            }

            return store;
        }, []);
    }

    private async getCssRoutes(source: string): Promise<string[] | null> {
        const dirRoutes: string[] = await extra.readdir(source);
        const union: string[] = dirRoutes.map((route: string) => path.join(source, route));
        const cssRoutes: string[] = this.reduceCssRoutes(union);

        return cssRoutes.length ? cssRoutes : null;
    }

    private getReadablePromises(routes: string[]): Array<Promise<string>> {
        return routes.map((route: string) => extra.readFile(route, { encoding: 'utf8' }));
    }

    private async getDocument(source: string): Promise<Document[]> {
        const route: string | null = this.getCssRoute(source);

        if (route) {
            const style: string = await extra.readFile(route, { encoding: 'utf8' });

            return [{ route, style }];
        }

        throw new TypeError(`No file with '.css' extension ${source}`);
    }

    private async getDocuments(source: string): Promise<Document[]> {
        const routes: string[] | null = await this.getCssRoutes(source);

        if (Array.isArray(routes) && routes.length) {
            const promises: Array<Promise<string>> = this.getReadablePromises(routes);
            const styles: string[] = await Promise.all(promises);

            return styles.map((style: string, index: number) => {
                return { route: routes[index], style };
            });
        }

        throw new TypeError(`No file with '.css' extension ${source}`);
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
