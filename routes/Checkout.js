import express from "express";

const router = express.Router();

import { create } from "../controller/checkout";

router.post("/create", create);

export default router;
