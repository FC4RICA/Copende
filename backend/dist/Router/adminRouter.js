"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createRole_1 = require("../util/Role/createRole");
const isAdmin_1 = require("../util/Role/isAdmin");
const GetRole_1 = require("../util/Role/GetRole");
const createPost_1 = require("../controller/Admin/createPost");
const deletePost_1 = require("../controller/Admin/deletePost");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send({
        message: "this is admin router",
    });
});
// Roles management
router.post("/role/createRole", createRole_1.createRole);
router.get("/role/isAdmin", isAdmin_1.isAdmin);
router.get("/role/getRole", GetRole_1.getRole);
//Posts management
router.post("/post/createPost", createPost_1.createPost);
router.delete("/post/deletePost", deletePost_1.deletePost);
exports.default = router;
