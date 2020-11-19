"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//? Importing a library to display colorful messages
const chalk_1 = __importDefault(require("chalk"));
mongoose_1.default.connect("mongodb://localhost:27017/souq_replica", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
}, (error) => {
    if (error) {
        console.log(chalk_1.default.bgWhite.bold.red(`There is an error connecting to the database the error is ${error}`));
    }
});
//# sourceMappingURL=mongoose.js.map