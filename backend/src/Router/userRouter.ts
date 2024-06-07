import express from 'express';
import { LogOut } from '../controller/User/user/Logout';
import { register } from '../controller/User/user/Register';
import { isLogin, validateToken } from '../middleware/auth';
import { Login } from '../controller/User/user/Login';
import { getUser } from '../controller/User/user/Getuser';
import { getUserByUserID } from '../controller/User/user/GetUserByUserID';

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        message: "this is user router",
    });
});

router.get("/getUser", validateToken, getUser);
router.get("/getUserByUserID", getUserByUserID);
router.get("/logout", LogOut);
router.post("/login", isLogin, Login);
router.post("/register", isLogin, register);

export default router;