"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adminmanager = void 0;
const quizmanager_1 = require("./quizmanager");
class Adminmanager {
    constructor() {
        this.quizmanage = new quizmanager_1.quizmanger();
    }
    addmember(socket) {
        this.createhandler(socket);
    }
    createhandler(socket) {
        socket.on('join-admin', () => {
            console.log("admin-join");
            socket.on('create-quiz', (data) => {
                if (this.quizmanage.getquiz(data.quiz)) {
                    return;
                }
                this.quizmanage.addquiz(data.quiz);
                console.log("quiz created");
            });
            socket.on('createProblem', (data) => {
                this.quizmanage.addProblem(data.quiz, data.problem);
            });
            socket.on('start', (data) => {
                this.quizmanage.Start(data.quizid);
            });
            socket.on('next', (data) => {
                this.quizmanage.Next(data.quizid);
                console.log("next");
            });
            socket.on('end', (data) => {
                this.quizmanage.End(data.quizid);
            });
        });
        console.log(1);
        socket.on('join', (data) => {
            console.log("user join");
            if (!data) {
                return;
            }
            const userId = this.quizmanage.addUser(data.quizid, data.name);
            socket.emit("init", {
                userId,
                state: this.quizmanage.getCurrentstate(data.quizid)
            });
            socket.join(data.quizid);
            socket.on('submit', (data) => {
                if (data.submission != 0 && data.submission != 1 && data.submission != 2 && data.submission != 3) {
                    console.error("issue while getting input " + data.submission);
                    return;
                }
                this.quizmanage.Submit(data.quizid, data.userid, data.problemid, data.submission);
            });
        });
    }
}
exports.Adminmanager = Adminmanager;
