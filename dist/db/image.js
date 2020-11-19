"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//? The schema to the image model
const imageSchema = new mongoose_1.Schema({
    in: {
        type: String,
        alias: "imageName",
        required: true,
    },
    t: {
        type: String,
        alias: "type",
        required: true,
    },
    img: {
        alias: "image",
        type: Buffer,
        required: true,
    },
    s: {
        type: Number,
        alias: "size",
        required: true,
    },
    u: {
        type: mongoose_1.Schema.Types.ObjectId,
        alias: "user",
        // required: true,
        ref: "User",
    },
}, { timestamps: true });
const Image = mongoose_1.model("Image", imageSchema);
exports.default = Image;
//# sourceMappingURL=image.js.map