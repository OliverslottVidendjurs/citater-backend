import express from "express";
import Citater from "../models/citatModels";
import Kategorier from "../models/kategoriModels";

const router = express.Router();

const getCitat = async (req: any, res: any, next: any) => {
    let citat;
    try {
        citat = await Citater.findById(req.params.id).populate("kategori");
        if (!citat)
            return res.status(404).json({ message: "Cannot find citat" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
    res.citat = citat;
    next();
}

router.get("/", async (req, res) => {
    const citater = await Citater.find().populate("kategori");
    res.send(citater);
});

router.get("/:id", getCitat, async(req: any, res: any) => {
    res.send(res.citat);
});

//https://mongoosejs.com/docs/populate.html
router.post("/", async (req, res) => {
    const citat = new Citater(req.body);
    try {
        const newCitat = await citat.save() as any;
        const kategori = await Kategorier.findById(req.body.kategori).populate("citater") as any;
        if (kategori) {
            kategori.citater.push(newCitat);
            kategori.save();
            newCitat.kategori = kategori;
            res.status(201).json(newCitat);
        } else {
            throw `Kategorien med id: ${req.body.kategori} findes ikke.`;
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.patch("/:id", getCitat, async (req: any, res: any) => {
    if (req.body.titel)
        res.citat.titel = req.body.titel;
    if (req.body.citatTekst)
        res.citat.citatTekst = req.body.citatTekst
    try {
        const updatedCitat = await res.citat.save();
        res.json(updatedCitat);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.delete("/all", async (req, res) => {
    try {
        const citater = await Citater.find({}) as any;
        for (const citat of citater) {
            await citat.remove();
            let kategorier = await Kategorier.findById({ _id: citat.kategori }) as any;
            if (kategorier) {
                kategorier.citater = kategorier.citater.filter((citat: any) => citat !== citat._id);
                await kategorier.save();
            }
        }
        res.json({ message: `Slettet alle ${citater.length} citater` });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.delete("/:id", getCitat, async (req: any, res: any) => {
    try {
        await res.citat.remove();
        const kategori = await Kategorier.findById(res.citat.kategori) as any;
        kategori.citater = kategori.citater.filter((citat: any) => citat !== citat._id);
        await kategori.save();
        res.json({ message: "Citat slettet" });
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

export default router;