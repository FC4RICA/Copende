import express from 'express';
import { createRole } from '../util/Role/createRole';

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        message: "this is admin router",
    });
});

// Roles management
router.post("/createRole", createRole);

export default router;