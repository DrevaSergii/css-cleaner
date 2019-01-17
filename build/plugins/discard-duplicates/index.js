"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const postcss_1=__importDefault(require("postcss"));class Controller{constructor(e){this.name=e}isPropExist(e,t){return e.some(e=>e.prop===t)}reducer(e,t){return this.isPropExist(e,t.prop)||e.unshift(t),e}isDeclaration(e){return"object"==typeof e&&e.hasOwnProperty("type")&&"decl"===e.type}discard(e){return void 0!==e.nodes&&(e.nodes=e.nodes.reduceRight((e,t)=>this.isDeclaration(t)?this.reducer(e,t):e,[])),e}walk(e){e.walkRules(e=>this.discard(e))}export(){return postcss_1.default.plugin(this.name,()=>e=>this.walk(e))}}exports.default=new Controller("discard-duplicates").export();