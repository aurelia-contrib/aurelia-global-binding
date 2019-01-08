(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('aurelia-templating')) :
  typeof define === 'function' && define.amd ? define(['exports', 'aurelia-templating'], factory) :
  (global = global || self, factory((global.au = global.au || {}, global.au.globalBinding = {}), global.au));
}(this, function (exports, aureliaTemplating) { 'use strict';

  class AbstractBindingRelayer {
      static inject() {
          return [aureliaTemplating.TargetInstruction];
      }
      static $view() {
          return null;
      }
      static $resource() {
          return {
              containerless: true,
              /**
               * Find and convert plain attributes to attributes with binding expressions
               * that bind to string literals
               */
              processAttributes: (compiler, resources, node, attributes) => {
                  for (let i = 0, ii = attributes.length; ii > i; ++i) {
                      const attr = attributes[i];
                      const attrName = attr.name;
                      const attrValue = attr.value;
                      const shouldIgnore = Boolean(
                      // or attribute with a command
                      attrName.indexOf('.') !== -1
                          // ignore attribute that is custom attribute
                          || resources.getAttribute(attrName)
                          // or attribute with interpolation expression
                          || compiler['bindingLanguage'].inspectTextContent(resources, attrValue));
                      if (shouldIgnore) {
                          continue;
                      }
                      // if it's a plain attribute, convert to a binding expression
                      // with value is a string literal
                      node.setAttribute(`${attrName}.bind`, `'${attrValue}'`);
                  }
              }
          };
      }
      constructor(target, expressions) {
          this.target = target;
          this.expressions = expressions;
          this.bindings = undefined;
      }
      created(owningView, view) {
          // Sometimes owningView is null
          this.context = owningView || view;
      }
      bind() {
          if (this.bindings === undefined) {
              this.bindings = this.expressions.map(e => e.createBinding(this.target));
          }
          this.bindings.forEach(b => b.bind(this.context));
      }
      unbind() {
          this.bindings.forEach(b => b.unbind());
      }
  }
  class DocumentBinding extends AbstractBindingRelayer {
      /**@internal */
      static $resource() {
          return Object.assign({}, super.$resource(), { name: 'document-binding' });
      }
      constructor(targetInstruction) {
          super(document, targetInstruction.expressions);
      }
  }
  class WindowBinding extends AbstractBindingRelayer {
      /**@internal */
      static $resource() {
          return Object.assign({}, super.$resource(), { name: 'window-binding' });
      }
      constructor(targetInstruction) {
          super(window, targetInstruction.expressions);
      }
  }

  function configure(config) {
      config.globalResources([
          WindowBinding,
          DocumentBinding
      ]);
  }

  exports.configure = configure;
  exports.WindowBinding = WindowBinding;
  exports.DocumentBinding = DocumentBinding;
  exports.AbstractBindingRelayer = AbstractBindingRelayer;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
