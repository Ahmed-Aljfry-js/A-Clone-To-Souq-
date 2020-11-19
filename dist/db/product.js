"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
//? The schema to the product model
const productSchema = new Schema({
    c: {
        type: String,
        alias: "condition",
    },
    pn: {
        type: String,
        alias: "productName",
        maxlength: 30,
        minlength: 8,
        trim: true,
        required: true,
    },
    pd: {
        type: String,
        alias: "productDescription",
        maxlength: 30,
        minlength: 8,
        trim: true,
        required: true,
    },
    img: [
        {
            ref: "Image",
            type: Schema.Types.ObjectId,
        },
    ],
    is: {
        type: Number,
        alias: "inStock",
        required: true,
    },
    ratings: [
        {
            rate: {
                type: Number,
                min: 0,
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: "Buyer",
            },
        },
    ],
    features: [{ type: String, minlength: 8, trim: true }],
    p: {
        type: Number,
        alias: "price",
        min: 0,
        required: true,
    },
    affiliateUsers: [
        {
            ref: "Buyer",
            type: Schema.Types.ObjectId,
        },
    ],
    w: {
        type: Number,
        alias: "wight",
        min: 0,
        required: true,
    },
}, { timestamps: true });
//? the instance methods to the product model
//? the static methods to the product model
//? the product model
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
//# sourceMappingURL=product.js.map