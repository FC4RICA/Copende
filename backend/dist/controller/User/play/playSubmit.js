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
Object.defineProperty(exports, "__esModule", { value: true });
exports.playSubmit = void 0;
const compareImg_1 = require("../../../util/compareImg");
const playSubmit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { base64Image, imgUrl } = req.body;
        const imageDiff = yield (0, compareImg_1.compareImg)(base64Image, imgUrl);
        res.json({ message: `Number of differing pixels: ${imageDiff}` });
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.playSubmit = playSubmit;
