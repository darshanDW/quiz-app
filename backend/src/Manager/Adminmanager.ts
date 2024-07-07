import { Socket } from "socket.io";
import { quizmanger } from "./quizmanager";
export class Adminmanager {
    public quizmanage;
    constructor() {
        this.quizmanage = new quizmanger();


    }
    addmember(socket: Socket) {
        this.createhandler(socket);
    }
    createhandler(socket: Socket) {
        socket.on('join-admin', () => {

            console.log("admin-join");

        });
        socket.on('create-quiz', (data) => {
            if (this.quizmanage.getquiz(data.quiz)) {
                return;
            }
            this.quizmanage.addquiz(data.quiz);
            console.log("quiz created");

        })
        socket.on('createProblem', (data) => {
            this.quizmanage.addProblem(data.quiz, data.problem);
        });
        socket.on('join', (data) => {
            console.log(data.quizid, data.name);
        })
    }

}