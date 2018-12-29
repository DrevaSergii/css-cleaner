import * as chai from 'chai';
import * as mocha from 'mocha';
import * as postcss from 'postcss';
import * as discard from '../../build/plugins/discard-duplicates';

mocha.describe('Discard duplicates plugin', () => {
    const styles = 'div {position: absolute; position: relative; top:0; top:0; left: 0; left: 0;}';
    const expected = 'div { position: relative; top:0; left: 0;}';

    mocha.test('should discard property duplicates', () => {
        postcss([discard]).process(styles, { from: '', to: '' })
            .then((result: postcss.Result) => chai.assert.strictEqual(result.css, expected));
    });
});
