"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
class default_1 {
    getPromiseFiles(documents) {
        return documents.map((document) => fs_extra_1.default.outputFile(document.route, document.style));
    }
    write(documents) {
        const promises = this.getPromiseFiles(documents);
        return Promise.all(promises).then(() => Promise.resolve());
    }
}
exports.default = default_1;
