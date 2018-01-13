import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | string config');

test('testing string-config', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(find('[data-test="foo-output"]').text(), '42', 'foo is set according to controller default');
    assert.equal(find('[data-test="bar-output"]').text(), 'someString', 'bar is set according to controller default');
  });
  fillIn('[data-test="foo-input"]', '43');
  andThen(function() {
    assert.equal(find('[data-test="foo-output"]').text(), '43', 'foo is updated by action');
    assert.equal(find('[data-test="bar-output"]').text(), 'someString', 'bar remains default');
    assert.equal(currentURL(), '/?foo=43', 'URL contains the foo query parameter');
  });
});
