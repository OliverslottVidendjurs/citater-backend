import express, { Request, Response } from "express";
import Citater, { Citat } from "../models/citatModels";
import Kategorier from "../models/kategoriModels";

const router = express.Router();

interface ResponseWithCitat extends Response {
    citat?: Citat
}

const getCitat = async (req: Request, res: ResponseWithCitat, next: () => void) => {
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

router.get("/", async (_, res) => {
    const citater = await Citater.find().populate("kategori");
    res.send(citater);
});

router.get("/getbykat/:id", async (req, res) => {
    const citater = await Citater.find({ kategori: req.params.id });
    res.send(citater);
});

router.get("/:id", getCitat, async (_, res: ResponseWithCitat) => {
    res.send(res.citat);
});

//https://mongoosejs.com/docs/populate.html
router.post("/", async (req, res) => {
    const citat = new Citater(req.body);
    try {
        const newCitat = await citat.save();
        const kategori = await Kategorier.findById(req.body.kategori);
        if (kategori) {
            newCitat.kategori = kategori;
            res.status(201).json(newCitat);
        } else {
            throw `Kategorien med id: ${req.body.kategori} findes ikke.`;
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.patch("/:id", getCitat, async (req, res: ResponseWithCitat) => {
    if (req.body.titel)
        res.citat!.titel = req.body.titel;
    if (req.body.citatTekst)
        res.citat!.citatTekst = req.body.citatTekst;
    if (req.body.kategori)
        res.citat!.kategori = req.body.kategori;
    try {
        const updatedCitat = await res.citat!.save();
        res.json(updatedCitat);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.delete("/all", async (_, res) => {
    try {
        await Citater.deleteMany({});
        res.json({ message: `Slettet alle` });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.delete("/:id", getCitat, async (_, res: ResponseWithCitat) => {
    try {
        await res.citat!.remove();
        res.json({ message: "Citat slettet" });
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

export default router;