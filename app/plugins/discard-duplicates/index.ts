import * as postcss from 'postcss';
import { Declaration, Plugin, Root, Rule } from 'postcss';

class Controller {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    private isPropExist(store: Declaration[], prop: string): boolean {
        return store.some((declaration) => declaration.prop === prop);
    }

    private reducer(store: Declaration[], declaration: Declaration): Declaration[] {
        if (!this.isPropExist(store, declaration.prop)) {
            store.push(declaration);
        }

        return store;
    }

    private discard(rule: Rule): Rule {
        rule.nodes = rule.nodes.reduceRight((store: Declaration[], declaration: Declaration) => {
            return this.reducer(store, declaration);
        }, []);

        return rule;
    }

    public clean(root: Root): Root {
        root.nodes = root.nodes.map((rule: Rule) => this.discard(rule));

        return root;
    }

    public export(): Plugin<any> {
        return postcss.plugin(this.name, () => (root: Root) => this.clean(root));
    }
}

module.exports = new Controller('discard-duplicates').export();
