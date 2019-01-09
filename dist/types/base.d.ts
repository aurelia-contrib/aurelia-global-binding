import { TargetInstruction, ViewCompiler, ViewResources, View } from 'aurelia-templating';
export declare class AbstractBindingRelayer {
    static inject(): (typeof TargetInstruction)[];
    static $view(): any;
    static $resource(): {
        containerless: boolean;
        /**
         * Find and convert plain attributes to attributes with binding expressions
         * that bind to string literals
         */
        processAttributes: (compiler: ViewCompiler, resources: ViewResources, node: Element, attributes: NamedNodeMap) => void;
    };
    private target;
    private expressions;
    private bindings;
    private context;
    constructor(target: Window | Document, targetInstruction: TargetInstruction);
    created(owningView: View, view: View): void;
    bind(): void;
    unbind(): void;
}
export declare class DocumentBinding extends AbstractBindingRelayer {
    constructor(targetInstruction: TargetInstruction);
}
export declare class WindowBinding extends AbstractBindingRelayer {
    constructor(targetInstruction: TargetInstruction);
}
