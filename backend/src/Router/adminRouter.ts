import express from 'express';
import { createRole } from '../util/Role/createRole';
import { isAdmin } from '../util/Role/isAdmin';

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        message: "this is admin router",
    });
});

// Roles management
router.post("/createRole", createRole);
router.get("/isAdmin", isAdmin);

export default router;