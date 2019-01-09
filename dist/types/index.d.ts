import { WindowBinding, DocumentBinding } from "./base";
export interface IFrameworkConfig {
    globalResources(...resources: any[]): this;
}
export declare function configure(config: IFrameworkConfig): void;
export { WindowBinding, DocumentBinding };
export { AbstractBindingRelayer } from './base';
