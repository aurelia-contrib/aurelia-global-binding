import { TargetInstruction } from 'aurelia-templating';

class AbstractBindingRelayer {
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
            processAttributes: (compiler, resources, node, attributes) => {
                for (let i = 0, ii = attributes.length; ii > i; ++i) {
                    const attr = attributes[i];
                    const attrName = attr.name;
                    const attrValue = attr.value;
                    const shouldIgnore = Boolean(
                    // ignore attribute with binding command
                    attrName.indexOf('.') !== -1
                        // ignore attribute that is custom attribute
                        || resources.getAttribute(attrName)
                        // ignore attribute with interpolation expression
                        || compiler['bindingLanguage'].inspectTextContent(resources, attrValue));
                    if (shouldIgnore) {
                        continue;
                    }
                    // if it's a plain attribute, convert to a binding expression
                    // with value is a string literal
                    node.setAttribute(`${attrName}.one-time`, `'${attrValue}'`);
                }
            }
        };
    }
    constructor(target, targetInstruction) {
        this.target = target;
        this.expressions = targetInstruction.expressions;
        this.bindings = undefined;
        targetInstruction.expressions = [];
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
        super(document, targetInstruction);
    }
}
class WindowBinding extends AbstractBindingRelayer {
    /**@internal */
    static $resource() {
        return Object.assign({}, super.$resource(), { name: 'window-binding' });
    }
    constructor(targetInstruction) {
        super(window, targetInstruction);
    }
}

function configure(config) {
    config.globalResources([
        WindowBinding,
        DocumentBinding
    ]);
}

export { configure, WindowBinding, DocumentBinding, AbstractBindingRelayer };
