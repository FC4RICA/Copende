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
exports.createRole = void 0;
const Schema_1 = require("../Model/Schema");
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body;
        const role = new Schema_1.RoleModel(name);
        yield role.save();
        res.status(200).send({
            message: "Role created successfully",
            role,
        });
    }
    catch (error) {
        console.log("Error on create Role", error.message);
    }
});
exports.createRole = createRole;
