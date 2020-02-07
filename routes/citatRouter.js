"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var citatModels_1 = __importDefault(require("../models/citatModels"));
var kategoriModels_1 = __importDefault(require("../models/kategoriModels"));
var router = express_1.default.Router();
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var citater;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, citatModels_1.default.find().populate("kategori")];
            case 1:
                citater = _a.sent();
                res.send(citater);
                return [2 /*return*/];
        }
    });
}); });
//https://mongoosejs.com/docs/populate.html
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var citat, newCitat, kategori, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                citat = new citatModels_1.default(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, citat.save()];
            case 2:
                newCitat = _a.sent();
                return [4 /*yield*/, kategoriModels_1.default.findById(req.body.kategori).populate("citater")];
            case 3:
                kategori = _a.sent();
                if (kategori) {
                    kategori.citater.push(newCitat);
                    kategori.save();
                    newCitat.kategori = kategori;
                    res.status(201).json(newCitat);
                }
                else {
                    throw "Kategorien med id: " + req.body.kategori + " findes ikke.";
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.status(400).json({ message: error_1 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var citat, kategori, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, citatModels_1.default.findById(req.params.id)];
            case 1:
                citat = _a.sent();
                if (!citat) return [3 /*break*/, 5];
                return [4 /*yield*/, citat.remove()];
            case 2:
                _a.sent();
                return [4 /*yield*/, kategoriModels_1.default.findById(citat.kategori)];
            case 3:
                kategori = _a.sent();
                kategori.citater = kategori.citater.filter(function (citat) { return citat !== citat._id; });
                return [4 /*yield*/, kategori.save()];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                ;
                res.json({ message: "Citat slettet" });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                res.status(500).json({ message: error_2 });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.delete("/all", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var citater, _i, citater_1, citat, kategorier, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, citatModels_1.default.find({})];
            case 1:
                citater = _a.sent();
                _i = 0, citater_1 = citater;
                _a.label = 2;
            case 2:
                if (!(_i < citater_1.length)) return [3 /*break*/, 7];
                citat = citater_1[_i];
                return [4 /*yield*/, citat.remove()];
            case 3:
                _a.sent();
                return [4 /*yield*/, kategoriModels_1.default.findById({ _id: citat.kategori })];
            case 4:
                kategorier = _a.sent();
                if (!kategorier) return [3 /*break*/, 6];
                kategorier.citater = kategorier.citater.filter(function (citat) { return citat !== citat._id; });
                return [4 /*yield*/, kategorier.save()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7:
                res.json({ message: "Slettet alle " + citater.length + " citater" });
                return [3 /*break*/, 9];
            case 8:
                error_3 = _a.sent();
                res.status(500).json({ message: error_3 });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=citatRouter.js.map