import * as chai from 'chai';
import * as mocha from 'mocha';
import Timber from '../../build';

mocha.describe('Timber', () => {
    const timber = new Timber();

    mocha.test('should create instance', () => {
        chai.assert.instanceOf(timber, Timber);
    });
});
