"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logout_1 = require("../controller/User/user/Logout");
const Register_1 = require("../controller/User/user/Register");
const auth_1 = require("../middleware/auth");
const Login_1 = require("../controller/User/user/Login");
const Getuser_1 = require("../controller/User/user/Getuser");
const GetUserByUserID_1 = require("../controller/User/user/GetUserByUserID");
const getPost_1 = require("../controller/User/post/getPost");
const EditUsername_1 = require("../controller/User/user/EditUsername");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send({
        message: "this is user router",
    });
});
router.get("/getUser", auth_1.validateToken, Getuser_1.getUser);
router.get("/getUserByUserID", GetUserByUserID_1.getUserByUserID);
router.get("/logout", Logout_1.LogOut);
router.post("/login", auth_1.isLogin, Login_1.Login);
router.post("/register", auth_1.isLogin, Register_1.register);
router.put("/editUsername", EditUsername_1.editUsername);
// Post router
router.get("/post/getPost", getPost_1.getPost);
exports.default = router;
