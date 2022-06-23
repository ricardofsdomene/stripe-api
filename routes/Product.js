import express from "express";

const router = express.Router();

import { create, update, get, del, getAll } from "../controller/product";

router.post("/create", create);
router.post("/update", update);
router.delete("/:id", del);
router.get("/:id", get);
router.get("/list/:limit", getAll);

export default router;
