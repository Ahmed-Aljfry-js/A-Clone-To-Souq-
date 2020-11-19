"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//? Importing a package to deal with images
const multer_1 = __importDefault(require("multer"));
const upload = multer_1.default();
//? Importing the image model
const image_1 = __importDefault(require("../db/image"));
const router = express_1.default.Router();
//~ The basic CRUD operations
//? Creating a image
router.post("/image", upload.single("img"), async (req, res) => {
    const file = req.file;
    try {
        const image = await new image_1.default({
            in: file.originalname,
            t: file.mimetype,
            s: file.size,
            img: file.buffer,
        }).save();
        res.status(201).send(image._id);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Image" });
    }
});
//? Reading an image
router.get("/image", async (req, res) => {
    const data = req.body;
    try {
        const image = await image_1.default.findById(data.id);
        if (image)
            res.status(200).send(image.in);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Image" });
    }
});
//? Updating a image
router.put("/image", upload.single("img"), async (req, res) => {
    const { file, body: data } = req;
    try {
        const image = await image_1.default.findByIdAndUpdate(data.id, {
            in: file.filename,
            t: file.mimetype,
            s: file.size,
            img: file.buffer,
        }, { new: true });
        res.status(201).send(image?._id);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Image" });
    }
});
//? Deleting a image
router.delete("/image", async (req, res) => {
    const data = req.body;
    try {
        const image = await image_1.default.findByIdAndDelete(data.id);
        res.status(200).send(image?._id);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Image" });
    }
});
exports.default = router;
//# sourceMappingURL=image.js.map