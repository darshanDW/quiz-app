import { IoManager } from "./index";
export type AllowedSubmissions = 0 | 1 | 2 | 3;
const PROBLEM_TIME_S = 20;
interface user {
    name: string;
    userid: string;
    points: number;

}
interface Submission {
    userid: string;
    problemid: string;
    iscorrect: boolean;
    optionselected: AllowedSubmissions
}
interface problem {
    problemid: number;
    title: string;
    desciption: string;
    image?: string;
    startime: number;
    answer: AllowedSubmissions;
    options: {
        id: number;
        title: string;
    }[]
    submission: Submission[]
}







export class quiz {

    public quizid: string;
    private hasStarted: boolean;
    public problems: problem[];
    private activeProblem: number;
    public users: user[];
    private currentState: "leaderboard" | "question" | "not_started" | "ended";
    constructor(quizid: string) {
        this.quizid = quizid;
        this.hasStarted = false;
        this.problems = []
        this.activeProblem = 0;
        this.users = [];
        this.currentState = "not_started";
    }

    public addproblem(problem: problem) {
        this.problems.push(problem);


    }
    private genRandonString(length: number) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
        var charLength = chars.length;
        var result = '';
        for (var i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
    public adduser(name: string) {
        const id = this.genRandonString(7);

        this.users.push({ userid: id, name, points: 0 });
        console.log(this.users);
    }
    public start() {
        this.hasStarted = true;
        if (this.problems) {
            this.setactiveproblem(this.problems[0])
        }
    }
    private setactiveproblem(problem: problem) {
        console.log("problem set");
        this.currentState = 'question';
        problem.startime = new Date().getTime();
        problem.submission = [];
        IoManager.getIo().to(this.quizid).emit("problem", {
            problem
        })
    }




}
