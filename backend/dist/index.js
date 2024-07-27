"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoManager = void 0;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const Adminmanager_1 = require("./Manager/Adminmanager");
const server = (0, http_1.createServer)();
require('dotenv').config();
const pORT = process.env.PORT;
class IoManager {
    // singletons
    static getIo() {
        if (!this.io) {
            const io = new socket_io_1.Server(server, {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"]
                }
            });
            this.io = io;
        }
        return this.io;
    }
}
exports.IoManager = IoManager;
;
const io = IoManager.getIo();
const member = new Adminmanager_1.Adminmanager();
io.on('connection', (client) => {
    console.log("Client connected");
    member.addmember(client);
    client.on('disconnect', () => {
        console.log("Client disconnected");
    });
});
server.listen(pORT, () => {
    console.log(`Server is listening on ${pORT} `);
});
