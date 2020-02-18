import mongoose, { Document } from "mongoose";

export interface Kategori extends Document {
    katogorinavn: string
}

const kategoriSchema = new mongoose.Schema({
    katogorinavn: {
        type: String,
        required: true,
    }
});

export default mongoose.model<Kategori>("Kategori", kategoriSchema);