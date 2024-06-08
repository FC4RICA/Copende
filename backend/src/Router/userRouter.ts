import express from 'express';
import { LogOut } from '../controller/User/user/Logout';
import { register } from '../controller/User/user/Register';
import { isLogin, validateToken } from '../middleware/auth';
import { Login } from '../controller/User/user/Login';
import { getUser } from '../controller/User/user/Getuser';
import { getUserByUserID } from '../controller/User/user/GetUserByUserID';
import { getPost } from '../controller/User/post/getPost';
import { editUsername } from '../controller/User/user/EditUsername';
import { editPassword } from '../controller/User/user/EditPassword';

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
router.put("/editUsername", editUsername);
router.put("/editPassword", editPassword);

// Post router
router.get("/post/getPost", getPost);

export default router;