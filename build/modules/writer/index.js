"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const fs_extra_1=__importDefault(require("fs-extra"));class default_1{getPromiseFiles(e){return e.map(e=>fs_extra_1.default.outputFile(e.route,e.style))}write(e){const t=this.getPromiseFiles(e);return Promise.all(t).then(()=>Promise.resolve())}}exports.default=default_1;