

import { AllowedSubmissions, quiz } from "../quiz";

let globalProblemId = 0;

export class quizmanger {
    private quizes: quiz[];
    constructor() {
        this.quizes = [];
    }
    public getquiz(id: string) {
        return this.quizes.find(x => x.quizid == id) ?? null;
    }
    public Start(quizid: string) {
        const quiz = this.getquiz(quizid);
        if (!quiz) {
            return;
        }
        quiz.start();
        console.log("started")
    }
    public addquiz(quizid: string) {
        if (this.getquiz(quizid)) {
            return;
        }

        const quiz1 = new quiz(quizid);
        this.quizes.push(quiz1);
        console.log(this.quizes);
    }
    public addProblem(quizid: string, problem: {

        title: string;
        description: string;
        image?: string;
        options: {
            id: number;
            title: string;
        }[];
        startime: number;
        answer: AllowedSubmissions;

    }) {
        const quiz = this.getquiz(quizid);
        if (!quiz) {
            console.log("quiz not found");

        }
        quiz?.addproblem({
            ...problem, problemid: globalProblemId++, startime: new Date().getTime(), submission: [],
        })
        console.log(quiz?.problems);
    };
    public addUser(quizid: string, name: string) {
        const quiz = this.getquiz(quizid);
        if (!quiz) {
            console.log("quiz not found");

        }
        return quiz?.adduser(name);

    }
    public Submit(quizid: string, userId: string, problemid: number, submission: 0 | 1 | 2 | 3
    ) {
        const quiz = this.getquiz(quizid);
        if (!quiz) {
            return;
        }
        quiz.submit(userId, problemid, submission);

    }



}