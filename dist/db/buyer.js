"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//? The packages to authenticate
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//TODO hash the password before saving it
//TODO return the user data after saving it
//? The schema to the buyer model
const buyerSchema = new mongoose_1.Schema({
    fn: {
        type: String,
        alias: "firstName",
        maxlength: 30,
        minlength: 8,
        trim: true,
        required: true,
    },
    ln: {
        type: String,
        alias: "lastName",
        maxlength: 30,
        minlength: 8,
        trim: true,
        required: true,
    },
    img: [
        {
            alias: "image",
            ref: "Image",
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    pw: {
        type: String,
        alias: "password",
        minlength: 8,
        required: true,
    },
    em: {
        type: String,
        alias: "email",
        minlength: 10,
        required: true,
        unique: true,
    },
    tokens: [{ type: String }],
    a: {
        type: Number,
        alias: "age",
        min: 12,
        required: true,
    },
    affiliateLink: [
        {
            type: String,
        },
    ],
}, { timestamps: true });
//? the instance methods to the buyer model
//^ Hashing passwords before saving them
buyerSchema.pre("save", async function (next) {
    this.pw = await bcrypt_1.default.hash(this.pw, 8);
    next();
});
//? the static methods to the buyer model
buyerSchema.statics.SignInToUser = async function (email, password) {
    let buyer = await Buyer.findOne({ em: email });
    if (!buyer) {
        return null;
    }
    let isMatch = await bcrypt_1.default.compare(password, buyer.pw);
    if (!isMatch) {
        return null;
    }
    let token = jsonwebtoken_1.default.sign({ id: buyer._id }, "1234567890");
    if (!token) {
        return null;
    }
    await Buyer.findByIdAndUpdate(buyer._id, {
        tokens: buyer.tokens.concat([token]),
    });
    return token;
};
const Buyer = mongoose_1.model("Buyer", buyerSchema);
exports.default = Buyer;
//# sourceMappingURL=buyer.js.map