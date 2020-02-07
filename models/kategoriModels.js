"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var kategoriSchema = new mongoose_1.default.Schema({
    katogorinavn: {
        type: String,
        required: true,
    },
    citater: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Citat"
        }]
});
exports.default = mongoose_1.default.model("Kategori", kategoriSchema);
//# sourceMappingURL=kategoriModels.js.map