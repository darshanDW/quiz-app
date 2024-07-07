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
    private users: user[];
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




}
