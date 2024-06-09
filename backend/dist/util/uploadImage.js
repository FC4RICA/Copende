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
exports.uploadImagePost = void 0;
const supabase_1 = require("../lib/supabase");
const typescript_base64_arraybuffer_1 = require("typescript-base64-arraybuffer");
const uploadImagePost = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const binaryData = (0, typescript_base64_arraybuffer_1.decode)(file.split(",")[1]);
    const fileName = `/post/${Date.now()}.png`;
    const { error } = yield supabase_1.supabase.storage
        .from("WebproImg")
        .upload(fileName, binaryData, {
        cacheControl: "image/png",
        contentType: "image/png"
    });
    if (error) {
        throw error;
    }
    const { data } = yield supabase_1.supabase.storage
        .from("WebproImg")
        .getPublicUrl(fileName);
    return data.publicUrl;
});
exports.uploadImagePost = uploadImagePost;
