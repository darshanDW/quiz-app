"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizmanger = void 0;
const quiz_1 = require("../quiz");
let globalProblemId = 0;
class quizmanger {
    constructor() {
        this.quizes = [];
    }
    getquiz(id) {
        return this.quizes.find(x => x.quizid == id) ?? null;
    }
    Start(quizid) {
        const quiz = this.getquiz(quizid);
        if (!quiz) {
            return;
        }
        quiz.start();
        console.log("started");
    }
    addquiz(quizid) {
        if (this.getquiz(quizid)) {
            return;
        }
        const quiz1 = new quiz_1.quiz(quizid);
        this.quizes.push(quiz1);
        console.log(this.quizes);
    }
    addProblem(quizid, problem) {
        const quiz = this.getquiz(quizid);
        if (!quiz) {
            console.log("quiz not found");
        }
        quiz?.addproblem({
            ...problem, problemid: globalProblemId++, startime: new Date().getTime(), submission: [],
        });
        console.log(quiz?.problems);
    }
    ;
    addUser(quizid, name) {
        const quiz = this.getquiz(quizid);
        if (!quiz) {
            console.log("quiz not found");
        }
        return quiz?.adduser(name);
    }
    Submit(quizid, userId, problemid, submission) {
        const quiz = this.getquiz(quizid);
        if (!quiz) {
            return;
        }
        quiz.submit(userId, problemid, submission);
    }
    getCurrentstate(quizid) {
        const quiz = this.getquiz(quizid);
        if (!quiz) {
            return;
        }
        quiz.getcurrentState();
    }
    ;
    Next(quizid) {
        const quiz = this.getquiz(quizid);
        if (!quiz) {
            return;
        }
        quiz.next();
    }
    ;
    End(quizid) {
        const quiz = this.getquiz(quizid);
        if (!quiz) {
            return;
        }
        quiz.end();
    }
}
exports.quizmanger = quizmanger;
