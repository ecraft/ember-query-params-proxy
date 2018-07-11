import { module, test } from 'qunit';
import { currentURL, fillIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | string config', function(hooks) {
    setupApplicationTest(hooks);

    test('testing string-config', async function (assert) {
        await visit('/');

        assert.dom('[data-test="foo-output"]').hasText('42', 'foo is set according to controller default');
        assert.dom('[data-test="bar-output"]').hasText('someString', 'bar is set according to controller default');

        await fillIn('[data-test="foo-input"]', '43');
        assert.dom('[data-test="foo-output"]').hasText('43', 'foo is updated by action');
        assert.dom('[data-test="bar-output"]').hasText('someString', 'bar remains default');
        assert.equal(currentURL(), '/?foo=43', 'URL contains the foo query parameter');
    });
});
