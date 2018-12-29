import * as postcss from 'postcss';

class Controller {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    private isPropExist(store: postcss.Declaration[], prop: string): boolean {
        return store.some((declaration: postcss.Declaration) => declaration.prop === prop);
    }

    private reducer(store: postcss.Declaration[], declaration: postcss.Declaration): postcss.Declaration[] {
        if (!this.isPropExist(store, declaration.prop)) {
            store.unshift(declaration);
        }

        return store;
    }

    private discard(rule: postcss.Rule): postcss.Rule {
        rule.nodes = rule.nodes.reduceRight((store: postcss.Declaration[], declaration: postcss.Declaration) => {
            return this.reducer(store, declaration);
        }, []);

        return rule;
    }

    private clean(root: postcss.Root): void {
        root.walkRules((rule: postcss.Rule) => this.discard(rule));
    }

    public export(): postcss.Plugin<any> {
        return postcss.plugin(this.name, () => (root: postcss.Root) => this.clean(root));
    }
}

module.exports = new Controller('discard-duplicates').export();
