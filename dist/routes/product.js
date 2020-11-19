"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//? Importing the product model
const product_1 = __importDefault(require("../db/product"));
const router = express_1.default.Router();
//~ The basic CRUD operations
//? Creating a product
router.post("/product", async (req, res) => {
    const data = req.body;
    try {
        const product = await new product_1.default(data).save();
        res.status(201).send(product);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Product" });
    }
});
//? Reading a product
router.get("/product", async (req, res) => {
    const data = req.body;
    try {
        const product = await product_1.default.findById(data.id);
        res.status(200).send(product);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Product" });
    }
});
//? Updating a product
router.put("/product", async (req, res) => {
    const data = req.body;
    try {
        const product = await product_1.default.findByIdAndUpdate(data.id, data, {
            new: true,
        });
        res.status(201).send(product);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Product" });
    }
});
//? Deleting a product
router.delete("/product", async (req, res) => {
    const data = req.body;
    try {
        const product = await product_1.default.findByIdAndDelete(data.id);
        res.status(200).send(product);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Product" });
    }
});
exports.default = router;
//# sourceMappingURL=product.js.map