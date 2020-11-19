"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//? Importing the buyer model
const buyer_1 = __importDefault(require("../db/buyer"));
//? Package to verify token
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
//TODO make a sign in route and sign out route and sign out all route
//TODO remove token from the buyer model
//~ The basic CRUD operations
//? Creating a buyer
router.post("/buyer", async (req, res) => {
    const data = req.body;
    try {
        const buyer = await new buyer_1.default(data).save();
        res.status(201).send(buyer);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Buyer" });
    }
});
//? Reading a buyer
router.get("/buyer", async (req, res) => {
    const data = req.body;
    try {
        const buyer = await buyer_1.default.findById(data.id);
        res.status(200).send(buyer);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Buyer" });
    }
});
//? Updating a buyer
router.put("/buyer", async (req, res) => {
    const data = req.body;
    try {
        const buyer = await buyer_1.default.findByIdAndUpdate(data.id, data, { new: true });
        res.status(201).send(buyer);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Buyer" });
    }
});
//? Deleting a buyer
router.delete("/buyer", async (req, res) => {
    const data = req.body;
    try {
        const buyer = await buyer_1.default.findByIdAndDelete(data.id);
        res.status(200).send(buyer);
    }
    catch (err) {
        res.status(500).send({ err, loc: "C R Buyer" });
    }
});
//~ Signing routes
//? Sign in route
router.post("/buyer/login", async (req, res) => {
    const data = req.body;
    try {
        let token = await buyer_1.default.SignInToUser(data.email, data.password);
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
router.post("/buyer/logout", async (req, res) => {
    const header = req.get("Authorization")?.replace("Bearer ", "");
    try {
        const token = jsonwebtoken_1.default.verify(header, "1234567890");
        let buyer = await buyer_1.default.findById(token.id);
        let tokens = buyer?.tokens;
        tokens = tokens?.filter((e) => e !== header);
        buyer = await buyer_1.default.findByIdAndUpdate(token.id, { tokens });
        res.send(buyer?.tokens);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
//? Sign out from all route
router.post("/buyer/logout/all", async (req, res) => {
    const header = req.get("Authorization")?.replace("Bearer ", "");
    try {
        const token = jsonwebtoken_1.default.verify(header, "1234567890");
        let buyer = await buyer_1.default.findById(token.id);
        let tokens = [];
        buyer = await buyer_1.default.findByIdAndUpdate(token.id, { tokens }, { new: true });
        res.send(buyer?.tokens);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
exports.default = router;
//# sourceMappingURL=buyer.js.map