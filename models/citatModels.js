"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var citatSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Kategori"
    }
});
exports.default = mongoose_1.default.model("Citat", citatSchema);
//# sourceMappingURL=citatModels.js.map