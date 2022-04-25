"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pageRoute_1 = __importDefault(require("./routes/pageRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
function route(app) {
    app.use("/api/page", pageRoute_1.default);
    app.use("/api/product", productRoute_1.default);
}
exports.default = route;
