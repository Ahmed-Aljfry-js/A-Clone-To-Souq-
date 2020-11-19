"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//? Importing the seller model
const seller_1 = __importDefault(require("../db/seller"));
const router = express_1.default.Router();
//~ The basic CRUD operations
//? Creating a seller
router.post("/seller", async (req, res) => {
    const data = req.body;
    try {
        const seller = await new seller_1.default(data).save();
        res.status(201).send(seller);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Seller" });
    }
});
//? Reading a seller
router.get("/seller", async (req, res) => {
    const data = req.body;
    try {
        const seller = await seller_1.default.findById(data.id);
        res.status(200).send(seller);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Seller" });
    }
});
//? Updating a seller
router.put("/seller", async (req, res) => {
    const data = req.body;
    try {
        const seller = await seller_1.default.findByIdAndUpdate(data.id, data, { new: true });
        res.status(201).send(seller);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Seller" });
    }
});
//? Deleting a seller
router.delete("/seller", async (req, res) => {
    const data = req.body;
    try {
        const seller = await seller_1.default.findByIdAndDelete(data.id);
        res.status(200).send(seller);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Seller" });
    }
});
//~ Signing routes
//? Sign in route
router.post("/seller/login", async (req, res) => {
    const data = req.body;
    try {
        let token = await seller_1.default.SignInToUser(data.email, data.password);
        if (!token) {
            throw new Error("Token not found");
        }
        res.send(token);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
//? Sign out route
router.post("/seller/logout", async (req, res) => {
    const header = req.get("Authorization")?.replace("Bearer ", "");
    try {
        const token = jsonwebtoken_1.default.verify(header, "1234567890");
        let seller = await seller_1.default.findById(token.id);
        let tokens = seller?.tokens;
        tokens = tokens?.filter((e) => e !== header);
        seller = await seller_1.default.findByIdAndUpdate(token.id, { tokens }, { new: true });
        res.send(seller?.tokens);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
//? Sign out from all route
router.post("/seller/logout/all", async (req, res) => {
    const header = req.get("Authorization")?.replace("Bearer ", "");
    try {
        const token = jsonwebtoken_1.default.verify(header, "1234567890");
        let seller = await seller_1.default.findById(token.id);
        let tokens = [];
        seller = await seller_1.default.findByIdAndUpdate(token.id, { tokens }, { new: true });
        res.send(seller?.tokens);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
exports.default = router;
//# sourceMappingURL=seller.js.map