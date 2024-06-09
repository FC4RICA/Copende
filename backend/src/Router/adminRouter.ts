import express from 'express';
import { createRole } from '../util/Role/createRole';
import { isAdmin } from '../util/Role/isAdmin';
import { getRole } from '../util/Role/GetRole';
import { createPost } from '../controller/Admin/createPost';
import { deletePost } from '../controller/Admin/deletePost';

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        message: "this is admin router",
    });
});

// Roles management
router.post("/role/createRole", createRole);
router.get("/role/isAdmin", isAdmin);
router.get("/role/getRole", getRole);

//Posts management
router.post("/post/createPost", createPost);
router.delete("/post/deletePost", deletePost);

export default router;