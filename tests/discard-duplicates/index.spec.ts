import chai from 'chai';
import mocha from 'mocha';
import postcss, { Result } from 'postcss';
import discard from '../../build/plugins/discard-duplicates';

mocha.describe('Discard duplicates plugin', () => {
    const actual: string = 'div {position: absolute; position: relative; top:0; top:0; left: 0; left: 0;}';
    const expect: string = 'div { position: relative; top:0; left: 0;}';

    mocha.test('should discard duplicate of property', () => {
        postcss([discard]).process(actual, { from: undefined })
            .then((result: Result) => chai.assert.strictEqual(result.css, expect));
    });
});
