import Controller from '@ember/controller';
import proxy from 'ember-queryparams-proxy';

export default Controller.extend({
  queryParams: [ 'foo', 'bar' ],
  foo: 42,
  bar: 'someString',
  queryParamsProxy: proxy()
});
