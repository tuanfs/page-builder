"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProduct = exports.getAllProduct = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, img, price } = req.body;
    try {
        if (!name || !price) {
            return res
                .status(404)
                .json({ success: false, message: "Missing name product or price" });
        }
        const newProduct = new Product_1.default({
            name,
            img,
            price,
        });
        if (!newProduct) {
            return res
                .status(404)
                .json({ success: false, message: "Missing name product or price" });
        }
        yield newProduct.save();
        res.json({
            success: true,
            message: "Create page successfully",
            page: newProduct,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.createProduct = createProduct;
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productList = yield Product_1.default.find();
        if (!productList) {
            res.status(404).json({ success: false, message: "Get all page rejected" });
        }
        res.json({ success: true, message: "Get all page successfully", productList });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: "false", message: "Server error" });
    }
});
exports.getAllProduct = getAllProduct;
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield Product_1.default.findById(id);
        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, message: "Get one product successfully", product });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getOneProduct = getOneProduct;
