"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const io = index_1.IoManager.getIo();
io.on('join-admin', (data) => {
    console.log(data.quiz);
});
