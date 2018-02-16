# ember-query-params-proxy

[![Ember Observer Score](http://emberobserver.com/badges/ember-query-params-proxy.svg?cache_bust=1)](http://emberobserver.com/addons/ember-query-params-proxy)
[![npm package version](https://img.shields.io/npm/v/ember-query-params-proxy.svg)](https://www.npmjs.com/package/ember-query-params-proxy)
[![license MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/ecraft/ember-query-params-proxy/blob/master/LICENSE.md)

This addon enables you to do [DDAU](https://dockyard.com/blog/2015/10/14/best-practices-data-down-actions-up) compatible handling of query parameters while passing the parameters on the subcomponents. This makes it easy to use query parameters in your application and let the controller contain the single source of truth with regards to the value of the parameters. The queryParams proxy gives you a convenient way to pass along several query parameters as well as their mutation actions to components without the need to enumerate each parameter and manually create mutation actions for them.

## Usage

* `ember install ember-query-params-proxy`
* In your controller file you specify the query parameters to use in normal fashion but also create a computed property with the help of the queryParams proxy like this:

  ```javascript
  import Controller from '@ember/controller';
  import proxy from 'ember-query-params-proxy';

  export default Controller.extend({
    queryParams: [ 'foo', 'bar' ],
    foo: 42,
    bar: 'someString',
    queryParamsProxy: proxy()
  });
  ```
* Pass along the queryParams proxy to your component in your template like this:
  ```handlebars
  {{test-component queryParamsProxy=queryParamsProxy}}
  ```
* The queryParams proxy contain aliased properties for all  queryParams defined in your controller. These aliases can be used to read the properties `<QUERY_PARAM_NAME>`, and the proxy also contain mutation actions that can be used to mutate the same directly on the controller `<QUERY_PARAM_NAME_mut>`. The proxy can be use in you component template like this:

  ```handlebars
  <div>
    foo: {{queryParamsProxy.foo}}
  </div>
  <div>
    bar: {{queryParamsProxy.bar}}
  </div>
  <div>
    foo: <input oninput={{action queryParamsProxy.foo_mut value="target.value"}}>
  </div>
  <div>
    bar: <input oninput={{action queryParamsProxy.bar_mut value="target.value"}}>
  </div>
  ```

* If using [ember-form-for](https://github.com/martndemus/ember-form-for) you probably want to use the third parameter of the `update` action which contains the value. In this you can simple include the option `emberFormFor` when creating the proxy like this:

  ```javascript
  import proxy from 'ember-query-params-proxy';

  queryParamsProxy: proxy({ emberFormFor: true })
  ```

## TODO:s & future enhancements

* Currently we only support string-configured query parameters:

  ```javascript
  queryParams: [ 'foo', 'bar' ]
  ```

  We should also support object-configured query parameters:

  ```javascript
  queryParams: {
    foo: {
      type: 'number'
    },
    bar: {
      type: 'string'
    }
  }
  ```

  As well as mixed-mode configurations:

  ```javascript
  queryParams: [ 'foo',
    { bar: 'query_params_bar' }
  ]
  ```

* It might also be good to make it possible to hook into the mutation action before it updates the query parameter property. For instance with more complex objects like dates and such, some manual mangling might be wanted.

## Development & Running

* `git clone <repository-url>` this repository
* `cd ember-query-params-proxy`
* `yarn install`
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Publishing

### First time

* Create a npm user account if you don't have one: `npm adduser`.
* Use `npm login` to store the credentials on the client.
* Ask an `@ecraft` npm organization admin to add you to the organization.

### Every time

* Make your changes
* `npm version <update_type>`, where update_type is one of the semantic versioning release types, patch, minor, or major. This command will change the version number in package.json. Note that this will also add a tag with this release number to your git repository.
* `git push`
* `npm publish`
* Give yourself a pat on the back
