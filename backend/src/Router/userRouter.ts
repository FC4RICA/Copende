import express from 'express';
import { LogOut } from '../controller/User/Logout';

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        message: "this is user router",
    });
});

router.get("/logout", LogOut);

export default router;