"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ToPNG = void 0;
const buffer_1 = require("buffer");
const base64ToPNG = (base64) => {
    const base64Data = base64.replace(/^data:image\/png;base64,/, "");
    const buffer = buffer_1.Buffer.from(base64Data, 'base64');
    const blob = new buffer_1.Blob([buffer], { type: 'image/png' });
    const file = new buffer_1.File([blob], "image.png", { type: 'image/png' });
    return file;
};
exports.base64ToPNG = base64ToPNG;
