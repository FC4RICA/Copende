import express from 'express';
import { createRole } from '../util/Role/createRole';
import { isAdmin } from '../util/Role/isAdmin';
import { getRole } from '../util/Role/GetRole';
import { createPost } from '../controller/Admin/createPost';

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        message: "this is admin router",
    });
});

// Roles management
router.post("/createRole", createRole);
router.get("/isAdmin", isAdmin);
router.get("/getRole",getRole);

router.post("/createPost",createPost);

export default router;