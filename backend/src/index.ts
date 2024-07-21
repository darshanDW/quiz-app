import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { Adminmanager } from './Manager/Adminmanager';
const server = createServer();
require('dotenv').config();
const pORT = process.env.PORT;

export class IoManager {
    private static io: Server;

    // singletons
    public static getIo() {
        if (!this.io) {
            const io = new Server(server, {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"]
                }
            });
            this.io = io;
        }
        return this.io;
    }

};
const io = IoManager.getIo();
const member = new Adminmanager();
io.on('connection', (client: Socket) => {
    console.log("Client connected");
    member.addmember(client);


    client.on('disconnect', () => {
        console.log("Client disconnected");
    });
});

server.listen(pORT, () => {

    console.log("Server is listening on port ");
});
