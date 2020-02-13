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

router.delete("/:id", async(req, res) => {
    const kategori = await Kategorier.findById(req.params.id);
    if(kategori){
        kategori.remove();
        res.json({ message: "Kategori slettet" });
    }
    // try {
    //     await res.citat.remove();
    //     const kategori = await Kategorier.findById(res.citat.kategori) as any;
    //     kategori.citater = kategori.citater.filter((citat: any) => citat !== citat._id);
    //     await kategori.save();
    //     res.json({ message: "Citat slettet" });
    // } catch (error) {
    //     res.status(500).json({ message: error })
    // }
});

export default router;