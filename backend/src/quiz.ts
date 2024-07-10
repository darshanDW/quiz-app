import { IoManager } from "./index";
export type AllowedSubmissions = 0 | 1 | 2 | 3;
const PROBLEM_TIME_S = 7;
interface user {
    name: string;
    userid: string;
    points: number;

}
interface Submission {
    userId: string;
    problemid: number;
    iscorrect: boolean;
    optionselected: AllowedSubmissions
}
interface problem {
    problemid: number;
    title: string;
    description: string;
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
        return id;
    }
    public start() {
        this.hasStarted = true;
        if (this.problems) {
            this.setactiveproblem(this.problems[0])
        };

    }

    private setactiveproblem(problem: problem) {
        console.log("problem set");
        console.log(problem);
        this.currentState = 'question';

        problem.startime = new Date().getTime();
        problem.submission = [];
        IoManager.getIo().to(this.quizid).emit("problem", {
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
    public submit(userId: string, problemid: number, answer: AllowedSubmissions) {
        const user = this.users.find(x => x.userid === userId);
        const problem = this.problems.find(x => x.problemid === problemid);
        if (!user || !problem) {
            console.log("user or problem not found");
            return;
        }
        const existingSubmission = problem.submission.find(x => x.userId === userId);
        if (existingSubmission) {
            console.log("prev submit")
            return;
        }
        problem.submission.push({
            userId,
            problemid,
            iscorrect: problem.answer === answer,
            optionselected: answer
        });
        console.log("submited");
        user.points += (1000 - (500 * (new Date().getTime() - problem.startime) / (PROBLEM_TIME_S * 1000)));

    };
    public getLeaderboard() {
        return this.users.sort((a, b) => a.points < b.points ? 1 : -1).slice(0, 20);;
    };
    public sendLeaderboard() {
        console.log("send leaderboard")
        this.currentState = "leaderboard"
        const leaderboard = this.getLeaderboard();
        IoManager.getIo().to(this.quizid).emit("leaderboard", {
            leaderboard
        })
    }




}
