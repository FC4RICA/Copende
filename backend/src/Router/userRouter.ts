import express from 'express';
import { LogOut } from '../controller/User/Logout';
import { register } from '../controller/User/Register';
import { isLogin, validateToken } from '../middleware/auth';
import { Login } from '../controller/User/Login';

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        message: "this is user router",
    });
});

router.get("/logout", LogOut);
router.post("/login", isLogin, Login);
router.post("/register", isLogin, register);

export default router;