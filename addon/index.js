import EmberObject, { computed, defineProperty, get, set } from '@ember/object';

export default (options = {}) => {
  return computed('queryParams', function() {
    return EmberObject.create({
      controller: this,
      init: function() {
        get(this, 'controller.queryParams').forEach(function(param) {
          defineProperty(this, param, computed.alias(`controller.${param}`));
          set(this, `${param}_mut`, function() {
            const value = options.emberFormFor ? arguments[2] : arguments[0]
            set(this, `controller.${param}`, value);
          }.bind(this));
        }.bind(this));
      }
    });
  });
};
