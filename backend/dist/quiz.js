"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quiz = void 0;
const index_1 = require("./index");
const PROBLEM_TIME_S = 15;
class quiz {
    constructor(quizid) {
        this.quizid = quizid;
        this.hasStarted = false;
        this.problems = [];
        this.activeProblem = 0;
        this.users = [];
        this.currentState = "not_started";
    }
    addproblem(problem) {
        this.problems.push(problem);
    }
    genRandonString(length) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
        var charLength = chars.length;
        var result = '';
        for (var i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
    adduser(name) {
        const id = this.genRandonString(7);
        this.users.push({ userid: id, name, points: 0 });
        console.log(this.users);
        return id;
    }
    start() {
        this.hasStarted = true;
        if (this.problems) {
            this.setactiveproblem(this.problems[0]);
        }
        ;
    }
    setactiveproblem(problem) {
        console.log("problem set");
        console.log(problem);
        this.currentState = 'question';
        problem.startime = new Date().getTime();
        problem.submission = [];
        index_1.IoManager.getIo().to(this.quizid).emit("problem", {
            title: problem.title,
            description: problem.description,
            image: problem.image,
            problemid: problem.problemid,
            options: problem.options
        }),
            console.log("question send");
        setTimeout(() => {
            this.sendLeaderboard();
        }, PROBLEM_TIME_S * 1000);
    }
    submit(userId, problemid, answer) {
        const user = this.users.find(x => x.userid === userId);
        const problem = this.problems.find(x => x.problemid === problemid);
        if (!user || !problem) {
            console.log("user or problem not found");
            return;
        }
        const existingSubmission = problem.submission.find(x => x.userId === userId);
        if (existingSubmission) {
            console.log("prev submit");
            return;
        }
        problem.submission.push({
            userId,
            problemid,
            iscorrect: problem.answer === answer,
            optionselected: answer
        });
        console.log("submited");
        if (problem.submission.find(x => x.iscorrect === true)) {
            console.log(1);
            user.points += (1000 - (500 * (new Date().getTime() - problem.startime) / (PROBLEM_TIME_S * 1000)));
        }
    }
    ;
    getLeaderboard() {
        return this.users.sort((a, b) => a.points < b.points ? 1 : -1).slice(0, 20);
        ;
    }
    ;
    sendLeaderboard() {
        console.log("send leaderboard");
        this.currentState = "leaderboard";
        const leaderboard = this.getLeaderboard();
        index_1.IoManager.getIo().to(this.quizid).emit("leaderboard", {
            leaderboard
        });
    }
    ;
    next() {
        this.activeProblem++;
        const problem = this.problems[this.activeProblem];
        if (problem) {
            this.setactiveproblem(problem);
        }
        else {
            this.activeProblem--;
            // send final results here
            // IoManager.getIo().emit("QUIZ_END", {
            //     problem
            // })
        }
    }
    getcurrentState() {
        if (this.currentState === "not_started") {
            return {
                type: "not_started"
            };
        }
        if (this.currentState === "ended") {
            return {
                type: "ended",
                leaderboard: this.getLeaderboard()
            };
        }
        if (this.currentState === "leaderboard") {
            return {
                type: "leaderboard",
                leaderboard: this.getLeaderboard()
            };
        }
        if (this.currentState === "question") {
            const problem = this.problems[this.activeProblem];
            return {
                type: "question",
                problem
            };
        }
    }
    ;
    end() {
        index_1.IoManager.getIo().to(this.quizid).emit("quiz_end", {});
        this.currentState = 'ended';
    }
}
exports.quiz = quiz;
