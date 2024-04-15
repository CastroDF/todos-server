"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var todoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
});
var TodoModel = mongoose_1.default.model("Todo", todoSchema);
exports.default = TodoModel;
