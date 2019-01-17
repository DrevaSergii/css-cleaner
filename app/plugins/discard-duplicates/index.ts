import postcss, { ChildNode, Declaration, Plugin, Root, Rule } from 'postcss';

class Controller {
    private readonly name: string;

    public constructor(name: string) {
        this.name = name;
    }

    private isPropExist(store: Declaration[], prop: string): boolean {
        return store.some((declaration: Declaration) => declaration.prop === prop);
    }

    private reducer(store: Declaration[], declaration: Declaration): Declaration[] {
        if (!this.isPropExist(store, declaration.prop)) {
            store.unshift(declaration);
        }

        return store;
    }

    private isDeclaration(value: any): value is Declaration {
        return typeof value === 'object' && value.hasOwnProperty('type') && value.type === 'decl';
    }

    private discard(rule: Rule): Rule {
        if (typeof rule.nodes !== 'undefined') {
            rule.nodes = rule.nodes.reduceRight((store: Declaration[], declaration: ChildNode) => {
                return this.isDeclaration(declaration) ? this.reducer(store, declaration) : store;
            }, []);
        }

        return rule;
    }

    private walk(root: Root): void {
        root.walkRules((rule: Rule) => this.discard(rule));
    }

    public export(): Plugin<any> {
        return postcss.plugin(this.name, () => (root: Root) => this.walk(root));
    }
}

export default new Controller('discard-duplicates').export();
