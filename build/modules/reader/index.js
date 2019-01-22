"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
class default_1 {
    isCss(routes) {
        return path_1.default.extname(routes) === '.css';
    }
    getCssRoute(source) {
        return this.isCss(source) ? path_1.default.resolve(source) : null;
    }
    reduceCssRoutes(source) {
        return source.reduce((store, route) => {
            const cssRoute = this.getCssRoute(route);
            if (cssRoute) {
                store.push(cssRoute);
            }
            return store;
        }, []);
    }
    async getCssRoutes(source) {
        const dirRoutes = await fs_extra_1.default.readdir(source);
        const union = dirRoutes.map((route) => path_1.default.join(source, route));
        const cssRoutes = this.reduceCssRoutes(union);
        return cssRoutes.length ? cssRoutes : null;
    }
    getReadablePromises(routes) {
        return routes.map((route) => fs_extra_1.default.readFile(route, { encoding: 'utf8' }));
    }
    async getDocument(source) {
        const route = this.getCssRoute(source);
        if (route) {
            const style = await fs_extra_1.default.readFile(route, { encoding: 'utf8' });
            return [{ route, style }];
        }
        throw new TypeError(`No file with '.css' extension ${source}`);
    }
    async getDocuments(source) {
        const routes = await this.getCssRoutes(source);
        if (Array.isArray(routes) && routes.length) {
            const promises = this.getReadablePromises(routes);
            const styles = await Promise.all(promises);
            return styles.map((style, index) => {
                return { route: routes[index], style };
            });
        }
        throw new TypeError(`No file with '.css' extension ${source}`);
    }
    async read(source) {
        const route = path_1.default.resolve(source);
        const stat = (await fs_extra_1.default.pathExists(route)) && (await fs_extra_1.default.stat(route));
        if (stat && stat.isFile()) {
            return this.getDocument(route);
        }
        else if (stat && stat.isDirectory()) {
            return this.getDocuments(route);
        }
        throw new TypeError(`No such file or directory ${route}`);
    }
}
exports.default = default_1;
