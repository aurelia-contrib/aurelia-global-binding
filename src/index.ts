import { WindowBinding, DocumentBinding } from "./base";

export interface IFrameworkConfig {
  globalResources(...resources: any[]): this;
}

export function configure(config: IFrameworkConfig) {
  config.globalResources([
    WindowBinding,
    DocumentBinding
  ]);
}

export { WindowBinding, DocumentBinding };
export { AbstractBindingRelayer } from './base';