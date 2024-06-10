"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareImg = void 0;
const pixelmatch_1 = __importDefault(require("pixelmatch"));
const axios_1 = __importDefault(require("axios"));
const pngjs_1 = require("pngjs");
const typescript_base64_arraybuffer_1 = require("typescript-base64-arraybuffer");
const compareImg = (file, imgUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(imgUrl, { responseType: 'arraybuffer' });
        const referenceImageBuffer = Buffer.from(response.data);
        const binaryData = (0, typescript_base64_arraybuffer_1.decode)(file.split(",")[1]);
        const referenceImage = pngjs_1.PNG.sync.read(referenceImageBuffer);
        const uploadedImage = pngjs_1.PNG.sync.read(Buffer.from(binaryData));
        const { width, height } = referenceImage;
        if (width !== uploadedImage.width || height !== uploadedImage.height) {
            throw new Error("Images have different dimensions");
        }
        const diff = new pngjs_1.PNG({ width, height });
        const numDiffPixels = (0, pixelmatch_1.default)(referenceImage.data, uploadedImage.data, diff.data, width, height, { threshold: 0.1 });
        const score = 100 - ((numDiffPixels / (width * height)) * 100);
        return parseFloat(score.toFixed(2));
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.compareImg = compareImg;
