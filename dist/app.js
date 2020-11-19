"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./db/mongoose");
//? Importing the custom routes
const buyer_1 = __importDefault(require("./routes/buyer"));
const image_1 = __importDefault(require("./routes/image"));
const seller_1 = __importDefault(require("./routes/seller"));
const product_1 = __importDefault(require("./routes/product"));
const app = express_1.default();
const port = 3030 || process.env.PORT;
//? Using the necessary middleware(s) to parse in-coming payloads
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//? Making the Home page return status code and message "hello world"
app.all("/", (_, res) => {
    res.status(200).send({ message: "Hello World" });
});
//? Using the custom routes here
app.use(buyer_1.default);
app.use(seller_1.default);
app.use(image_1.default);
app.use(product_1.default);
//? Running the server
app.listen(port, () => console.log(`The server is running on port ${port}`));
//# sourceMappingURL=app.js.map