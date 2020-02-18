import express from "express";
import Kategorier from "../models/kategoriModels";

const router = express.Router();

router.get("/:id", async (req, res) => {
    const kategorier = await Kategorier.findById(req.params.id);
    res.send(kategorier);
});

router.get("/", async (_, res) => {
    const kategorier = await Kategorier.find();
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

router.delete("/:id", async(req, res) => {
    const kategori = await Kategorier.findById(req.params.id);
    if(kategori){
        kategori.remove();
        res.json({ message: "Kategori slettet" });
    }
});

export default router;