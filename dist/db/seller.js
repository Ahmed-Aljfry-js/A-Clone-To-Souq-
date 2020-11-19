"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//? The packages to authenticate
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//? The schema to the seller model
const sellerSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
//? the instance methods to the seller model
//^ Hashing passwords before saving them
sellerSchema.pre("save", async function (next) {
    this.pw = await bcrypt_1.default.hash(this.pw, 8);
    next();
});
//? the static methods to the seller model
sellerSchema.statics.SignInToUser = async function (email, password) {
    let seller = await Seller.findOne({ em: email });
    if (!seller) {
        return null;
    }
    let isMatch = await bcrypt_1.default.compare(password, seller.pw);
    if (!isMatch) {
        return null;
    }
    let token = jsonwebtoken_1.default.sign({ id: seller._id }, "1234567890");
    if (!token) {
        return null;
    }
    await Seller.findByIdAndUpdate(seller._id, {
        tokens: seller.tokens.concat([token]),
    });
    return token;
};
const Seller = mongoose_1.model("Seller", sellerSchema);
exports.default = Seller;
//# sourceMappingURL=seller.js.map