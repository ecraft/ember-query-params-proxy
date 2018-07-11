import { module, test } from 'qunit';
import { fillIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | string config', function(hooks) {
    setupApplicationTest(hooks);

    test('testing string-config', async function (assert) {
        await visit('/');

        assert.equal(find('[data-test="foo-output"]').text(), '42', 'foo is set according to controller default');
        assert.equal(find('[data-test="bar-output"]').text(), 'someString', 'bar is set according to controller default');

        await fillIn('[data-test="foo-input"]', '43');
        assert.equal(find('[data-test="foo-output"]').text(), '43', 'foo is updated by action');
        assert.equal(find('[data-test="bar-output"]').text(), 'someString', 'bar remains default');
        assert.equal(currentURL(), '/?foo=43', 'URL contains the foo query parameter');
    });
});
