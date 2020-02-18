import mongoose, {Document} from "mongoose";
import { Kategori } from "./kategoriModels";

export interface Citat extends Document {
    titel: string,
    citatTekst: string,
    kategori: Kategori
}

const citatSchema = new mongoose.Schema({
    titel: {
        type: String,
        required: true
    },
    citatTekst: {
        type: String,
        required: true
    },
    citatDato: {
        type: Date,
        required: true,
        default: Date.now
    },
    kategori: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Kategori"
    }
});

export default mongoose.model<Citat>("Citat", citatSchema);