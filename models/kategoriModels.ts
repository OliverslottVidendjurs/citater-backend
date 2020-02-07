import mongoose from "mongoose";

const kategoriSchema = new mongoose.Schema({
    katogorinavn: {
        type: String,
        required: true,
    },
    citater: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Citat"
    }]
});

export default mongoose.model("Kategori", kategoriSchema);