import postcss, { ChildNode, Declaration, Plugin, Root, Rule } from 'postcss';

class Controller {
    private readonly name: string;

    public constructor(name: string) {
        this.name = name;
    }

    private isDeclaration(value: any): value is Declaration {
        return typeof value === 'object' && value.hasOwnProperty('type') && value.type === 'decl';
    }

    private isPropExist(store: Declaration[], prop: string): boolean {
        return store.some((declaration: Declaration) => declaration.prop === prop);
    }

    private reducer(store: Declaration[], declaration: ChildNode): Declaration[] {
        if (this.isDeclaration(declaration) && !this.isPropExist(store, declaration.prop)) {
            store.unshift(declaration);
        }

        return store;
    }

    private discard(rule: Rule): Rule {
        if (rule.nodes) {
            rule.nodes = rule.nodes.reduceRight((store: Declaration[], declaration: ChildNode) => {
                return this.reducer(store, declaration);
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
