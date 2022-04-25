"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pageControler_1 = require("../../controlers/pageControler");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/create", pageControler_1.createPage);
router.delete("/delete/:id", pageControler_1.deletePage);
router.put("/update/:id", pageControler_1.updatePage);
router.put("/update-card/:id", pageControler_1.updateContentCardProduct);
router.get("/:id", pageControler_1.getOnePage);
router.get("/", pageControler_1.getAllPage);
exports.default = router;
