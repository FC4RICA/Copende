"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createRole_1 = require("../util/Role/createRole");
const isAdmin_1 = require("../util/Role/isAdmin");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send({
        message: "this is admin router",
    });
});
// Roles management
router.post("/createRole", createRole_1.createRole);
router.get("/isAdmin", isAdmin_1.isAdmin);
exports.default = router;
