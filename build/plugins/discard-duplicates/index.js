"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postcss_1 = __importDefault(require("postcss"));
class Controller {
    constructor(name) {
        this.name = name;
    }
    isDeclaration(value) {
        return typeof value === 'object' && value.hasOwnProperty('type') && value.type === 'decl';
    }
    isPropExist(store, prop) {
        return store.some((declaration) => declaration.prop === prop);
    }
    reducer(store, declaration) {
        if (this.isDeclaration(declaration) && !this.isPropExist(store, declaration.prop)) {
            store.unshift(declaration);
        }
        return store;
    }
    discard(rule) {
        if (rule.nodes) {
            rule.nodes = rule.nodes.reduceRight((store, declaration) => {
                return this.reducer(store, declaration);
            }, []);
        }
        return rule;
    }
    walk(root) {
        root.walkRules((rule) => this.discard(rule));
    }
    export() {
        return postcss_1.default.plugin(this.name, () => (root) => this.walk(root));
    }
}
exports.default = new Controller('discard-duplicates').export();
