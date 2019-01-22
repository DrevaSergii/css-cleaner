"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postcss_1 = __importDefault(require("postcss"));
const postcss_merge_longhand_1 = __importDefault(require("postcss-merge-longhand"));
const postcss_sorting_1 = __importDefault(require("postcss-sorting"));
const reader_1 = __importDefault(require("./modules/reader"));
const writer_1 = __importDefault(require("./modules/writer"));
const discard_duplicates_1 = __importDefault(require("./plugins/discard-duplicates"));
class default_1 {
    constructor(options) {
        this.reader = new reader_1.default();
        this.writer = new writer_1.default();
        this.plugins = [discard_duplicates_1.default, postcss_merge_longhand_1.default, postcss_sorting_1.default(options.sort)];
    }
    stylesReducer(documents) {
        return documents.map((document) => {
            const result = postcss_1.default(this.plugins).process(document.style);
            document.style = result.css;
            return document;
        });
    }
    clean(source) {
        return this.reader.read(source)
            .then((documents) => this.stylesReducer(documents))
            .then((documents) => this.writer.write(documents));
    }
}
exports.default = default_1;
