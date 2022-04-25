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
exports.updateContentCardProduct = exports.updatePage = exports.getOnePage = exports.deletePage = exports.getAllPage = exports.createPage = void 0;
const Page_1 = __importDefault(require("../models/Page"));
const Product_1 = __importDefault(require("../models/Product"));
const createPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageName, path, sections, status } = req.body;
    try {
        if (!pageName || !path) {
            return res
                .status(404)
                .json({ success: false, message: "Missing name page or path" });
        }
        const newPage = new Page_1.default({
            pageName,
            path,
            sections,
            status,
        });
        if (!newPage) {
            return res
                .status(404)
                .json({ success: false, message: "Missing name page or path" });
        }
        yield newPage.save();
        res.json({
            success: true,
            message: "Create page successfully",
            page: newPage,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.createPage = createPage;
const getAllPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageList = yield Page_1.default.find();
        if (!pageList) {
            res.status(404).json({ success: false, message: "Get all page rejected" });
        }
        res.json({ success: true, message: "Get all page successfully", pageList });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: "false", message: "Server error" });
    }
});
exports.getAllPage = getAllPage;
const deletePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletePage = yield Page_1.default.findByIdAndDelete(id);
        if (!deletePage) {
            return res.status(404).json({ success: false, message: "Page not found" });
        }
        res.json({
            success: true,
            message: "Delete page successfully",
            page: deletePage,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.deletePage = deletePage;
const getOnePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const page = yield Page_1.default.findById(id);
        if (!page) {
            return res.status(404).json({ success: false, message: "Page not found" });
        }
        res.json({
            success: true,
            message: "Get one page successfully",
            page: page,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getOnePage = getOnePage;
const updatePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { pageName, path, sections, status } = req.body;
    try {
        let updatedPageData = {
            pageName,
            path,
            sections,
            status,
        };
        const updatedPage = yield Page_1.default.findByIdAndUpdate(id, updatedPageData, {
            new: true,
        });
        if (!updatedPage) {
            return res.status(404).json({ success: false, message: "Page not found" });
        }
        res.json({
            success: true,
            message: "Updated page successfully",
            page: updatedPage,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.updatePage = updatePage;
const updateContentCardProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { priceLt, priceGt, idParent, idChildren, idItem, itemShow } = req.body;
    try {
        const page = yield Page_1.default.findById(id);
        let productList = [];
        if (priceLt || priceGt) {
            const product = yield Product_1.default.find();
            productList = product.filter((item) => item.price > priceGt && item.price < priceLt);
        }
        const pageNew = Object.assign({}, page._doc);
        pageNew.sections = pageNew.sections.map((item) => {
            if (item.id === idParent) {
                item.children = item.children.map((item) => {
                    if (item.id === idChildren) {
                        item.children = item.children.map((item) => {
                            if (item.id === idItem) {
                                item.content = [
                                    priceGt,
                                    priceLt,
                                    itemShow,
                                    JSON.stringify(productList),
                                ];
                            }
                            return item;
                        });
                    }
                    return item;
                });
            }
            return item;
        });
        const updatedPage = yield Page_1.default.findByIdAndUpdate(id, page, {
            new: true,
        });
        if (!updatedPage) {
            return res.status(404).json({ success: false, message: "Page not found" });
        }
        res.json({
            success: true,
            message: "Update content card product succsfully",
            page: {
                pageNew,
                content: [priceGt, priceLt, itemShow, JSON.stringify(productList)],
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.updateContentCardProduct = updateContentCardProduct;
