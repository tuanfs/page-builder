"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PageSchema = new Schema({
    pageName: {
        type: String,
    },
    path: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    sections: [
        {
            spacing: {
                type: Object,
            },
            id: {
                type: String,
            },
            columnActive: {
                type: Number,
            },
            type: {
                type: String,
            },
            children: [
                {
                    id: { type: String },
                    children: [
                        {
                            content: [],
                            id: { type: String },
                        },
                    ],
                },
            ],
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("pages", PageSchema);
