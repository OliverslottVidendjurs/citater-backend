import express from "express";
import Kategorier from "../models/kategoriModels";

const router = express.Router();

router.get("/", async (req, res) => {
    const kategorier = await Kategorier.find().populate("citater");
    res.send(kategorier);
});

router.post("/", async (req, res) => {
    const kategori = new Kategorier(req.body);
    try {
        const newKategori = await kategori.save();
        res.status(201).json(newKategori);
    } catch (error) {
        res.status(400).json({message: error});
    }
});

export default router;