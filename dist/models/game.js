"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GameSchema = new mongoose_1.Schema({
    title: {
        type: string,
        required: [true, 'Title Required']
    },
});
