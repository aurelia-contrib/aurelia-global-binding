System.register(['aurelia-templating'], function (exports, module) {
    'use strict';
    var TargetInstruction;
    return {
        setters: [function (module) {
            TargetInstruction = module.TargetInstruction;
        }],
        execute: function () {

            exports('configure', configure);

            /*! *****************************************************************************
            Copyright (c) Microsoft Corporation. All rights reserved.
            Licensed under the Apache License, Version 2.0 (the "License"); you may not use
            this file except in compliance with the License. You may obtain a copy of the
            License at http://www.apache.org/licenses/LICENSE-2.0

            THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
            KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
            WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
            MERCHANTABLITY OR NON-INFRINGEMENT.

            See the Apache Version 2.0 License for specific language governing permissions
            and limitations under the License.
            ***************************************************************************** */
            /* global Reflect, Promise */

            var extendStatics = function(d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };

            function __extends(d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            }

            var __assign = function() {
                __assign = Object.assign || function __assign(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };

            var AbstractBindingRelayer = /** @class */ (function () {
                function AbstractBindingRelayer(target, expressions) {
                    this.target = target;
                    this.expressions = expressions;
                    this.bindings = undefined;
                }
                AbstractBindingRelayer.inject = function () {
                    return [TargetInstruction];
                };
                AbstractBindingRelayer.$view = function () {
                    return null;
                };
                AbstractBindingRelayer.$resource = function () {
                    return {
                        containerless: true,
                        /**
                         * Find and convert plain attributes to attributes with binding expressions
                         * that bind to string literals
                         */
                        processAttributes: function (compiler, resources, node, attributes) {
                            for (var i = 0, ii = attributes.length; ii > i; ++i) {
                                var attr = attributes[i];
                                var attrName = attr.name;
                                var attrValue = attr.value;
                                var shouldIgnore = Boolean(
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
                                node.setAttribute(attrName + ".bind", "'" + attrValue + "'");
                            }
                        }
                    };
                };
                AbstractBindingRelayer.prototype.created = function (owningView, view) {
                    // Sometimes owningView is null
                    this.context = owningView || view;
                };
                AbstractBindingRelayer.prototype.bind = function () {
                    var _this = this;
                    if (this.bindings === undefined) {
                        this.bindings = this.expressions.map(function (e) { return e.createBinding(_this.target); });
                    }
                    this.bindings.forEach(function (b) { return b.bind(_this.context); });
                };
                AbstractBindingRelayer.prototype.unbind = function () {
                    this.bindings.forEach(function (b) { return b.unbind(); });
                };
                return AbstractBindingRelayer;
            }());
            var DocumentBinding = exports('DocumentBinding', /** @class */ (function (_super) {
                __extends(DocumentBinding, _super);
                function DocumentBinding(targetInstruction) {
                    return _super.call(this, document, targetInstruction.expressions) || this;
                }
                /**@internal */
                DocumentBinding.$resource = function () {
                    return __assign({}, _super.$resource.call(this), { name: 'document-binding' });
                };
                return DocumentBinding;
            }(AbstractBindingRelayer)));
            var WindowBinding = exports('WindowBinding', /** @class */ (function (_super) {
                __extends(WindowBinding, _super);
                function WindowBinding(targetInstruction) {
                    return _super.call(this, window, targetInstruction.expressions) || this;
                }
                /**@internal */
                WindowBinding.$resource = function () {
                    return __assign({}, _super.$resource.call(this), { name: 'window-binding' });
                };
                return WindowBinding;
            }(AbstractBindingRelayer)));

            function configure(config) {
                config.globalResources([
                    WindowBinding,
                    DocumentBinding
                ]);
            }

        }
    };
});
