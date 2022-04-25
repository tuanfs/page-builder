"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productControler_1 = require("../../controlers/productControler");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/create", productControler_1.createProduct);
router.get("/:id", productControler_1.getOneProduct);
router.get("/", productControler_1.getAllProduct);
exports.default = router;
