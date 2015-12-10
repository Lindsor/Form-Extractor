window.formExtractor = (function() {
  'use strict';

  var defaultName = "data";

  /**
   * The form extractor module.
   * @type {Object}
   */
  var module = {};

  /**
   * Extracs the data from the passed in form.
   * @param  {Object} form The DOM form object.
   */
  module.extract = function(form) {
    var elements = form.elements || [],
      data = {},
      element,
      name,
      type,
      value;

    for (var i = 0, l = elements.length; i < l; i++) {
      element = elements[i];
      name = element.name || (defaultName + i);
      type = (element.type || element.tagName).toLowerCase();
      value = element.value;

      if (type === "checkbox") {
        if (!data[name]) {
          data[name] = [];
        }
        if (element.checked) {
          data[name].push(value);
        }
      } else if (type === "radio") {
        if (element.checked) {
          data[name] = value;
        }
      } else if (type === "fieldset" || type === "output") {
        //Do nothing
      } else {
        data[name] = value;
      }
    }

    return data;
  };

  return module;
})();
