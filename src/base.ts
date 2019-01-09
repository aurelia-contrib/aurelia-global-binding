import { TargetInstruction, ViewCompiler, ViewResources, View } from 'aurelia-templating';
import { Binding, BindingExpression, Scope } from 'aurelia-binding';

export class AbstractBindingRelayer {

  static inject() {
    return [TargetInstruction];
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
      processAttributes: (compiler: ViewCompiler, resources: ViewResources, node: Element, attributes: NamedNodeMap) => {
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
            || compiler['bindingLanguage'].inspectTextContent(resources, attrValue)
          );
          if (shouldIgnore) {
            continue;
          }
          // if it's a plain attribute, convert to a binding expression
          // with value is a string literal
          node.setAttribute(`${attrName}.one-time`, `'${attrValue}'`);
        }
      }
    }
  }

  private target: Window | Document;
  private expressions: BindingExpression[];
  private bindings: Binding[] | null;
  private context: View;
  
  constructor(target: Window | Document, expressions: BindingExpression[]) {
    this.target = target;
    this.expressions = expressions;
    this.bindings = undefined;
  }

  created(owningView: View, view: View) {
    // Sometimes owningView is null
    this.context = owningView || view;
  }

  bind() {
    if (this.bindings === undefined) {
      this.bindings = this.expressions.map(e => e.createBinding(this.target));
    }
    this.bindings.forEach(b => b.bind(this.context as any as Scope));
  }

  unbind() {
    this.bindings.forEach(b => b.unbind());
  }
}

const noExpressions: BindingExpression[] = [];

export class DocumentBinding extends AbstractBindingRelayer {

  /**@internal */
  static $resource() {
    return {
      ...super.$resource(),
      name: 'document-binding',
    }
  }

  constructor(targetInstruction: TargetInstruction) {
    super(document, targetInstruction.expressions as BindingExpression[]);
    targetInstruction.expressions = noExpressions;
  }
}

export class WindowBinding extends AbstractBindingRelayer {

  /**@internal */
  static $resource() {
    return {
      ...super.$resource(),
      name: 'window-binding',
    }
  }

  constructor(targetInstruction: TargetInstruction) {
    super(window, targetInstruction.expressions as BindingExpression[]);
    targetInstruction.expressions = noExpressions;
  }
}
