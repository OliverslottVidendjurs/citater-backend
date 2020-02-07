import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import citatRouter from "./routes/citatRouter";
import kategoriRouter from "./routes/kategoriRouter";

mongoose.connect("mongodb://localhost/citater", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("open", () => {
    console.log("connected to db");
});

db.on("error", (error: any) => {
    console.error(error);
});

const app = express();
app.use(express.json());
app.use(cors());
app.use("/citater", citatRouter);
app.use("/kategorier", kategoriRouter);
app.listen(5001, () => {
    console.log("listening on 5001");
});