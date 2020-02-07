"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var citatRouter_1 = __importDefault(require("./routes/citatRouter"));
var kategoriRouter_1 = __importDefault(require("./routes/kategoriRouter"));
mongoose_1.default.connect("mongodb://localhost/citater", { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose_1.default.connection;
db.on("open", function () {
    console.log("connected to db");
});
db.on("error", function (error) {
    console.error(error);
});
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/citater", citatRouter_1.default);
app.use("/kategorier", kategoriRouter_1.default);
app.listen(5001, function () {
    console.log("listening on 5001");
});
//# sourceMappingURL=index.js.map