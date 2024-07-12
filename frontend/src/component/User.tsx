
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Quizp } from "./Quiz";
import { Leaderboard } from "./Leaderboard";
import { Result } from "./Result";
const User = () => {

    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [code, setCode] = useState("");
    if (!submitted) {
        return <div>
            <div className="bg-gray-100 flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold mb-2 text-slate-600">
                            Enter the code to join
                        </h1>
                        <p className="text-gray-600">It’s on the screen in front of you</p>
                    </div>
                    <div className="mb-8">
                        <input
                            className="text-center w-64 p-2 border-2 border-purple-600 rounded-lg shadow-sm focus:outline-none focus:border-purple-800"
                            placeholder="1234 5678"
                            style={{ fontSize: "1rem" }}
                            type="text"
                            onChange={(e) => {
                                setCode(e.target.value)
                            }}
                        />
                        <br /> <br />
                        <input
                            className="text-center w-64 p-2 border-2 border-purple-600 rounded-lg shadow-sm focus:outline-none focus:border-purple-800"
                            placeholder="Your name"
                            style={{ fontSize: "1rem" }}
                            type="text"
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                    </div>
                    <button
                        className="bg-purple-600 text-white w-64 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-opacity-50"
                        style={{ fontSize: "1rem" }}
                        onClick={() => {
                            setSubmitted(true);
                        }}
                    >
                        Join
                    </button>
                </div>
            </div>

        </div>
    }

    return <UserLoggedin code={code} name={name} />
}
export default User;
interface UserLoggedinProps {
    code: string;
    name: string;
}

export const UserLoggedin: React.FC<UserLoggedinProps> = ({ code, name }): any => {
    const quizid = code;
    interface data {
        title: string;
        description: string;
        image?: string;
        problemid: number;
        options: {
            id: number;
            title: string
        }[]
    };
    const [S, setS] = useState<Socket | null>(null);
    const [currentState, setCurrentState] = useState("not_started");
    const [currentQuestion, setCurrentQuestion] = useState<data>({
        title: "",
        description: '',
        image: "",
        problemid: 0,
        options: [{
            id: 0,
            title: '',
        }]
    });
    const [userId, setUserId] = useState("");
    const [leaderboard, setleaderboard]: any = useState([{ points: 0, name: "", userid: "" }]);
    useEffect(() => {


        const socket: Socket = io("http://localhost:3000");
        setS(socket);
        socket.emit('join', { quizid, name });

        console.log(quizid, name);

        socket.on("init", ({ userId, state }) => {
            setUserId(userId);

            if (state.leaderboard) {
                setleaderboard(state.leaderboard)
            }

            if (state.problem) {
                setCurrentQuestion(state.problem);
            }

            setCurrentState(state.type);
        });

        socket.on("problem", (d) => {
            setCurrentState("question");
            setCurrentQuestion(d);
            console.log(d);

        });
        socket.on("leaderboard", (d) => {
            setCurrentState("leaderboard");
            setleaderboard(d.leaderboard);
            console.log(d.leaderboard);

        });
        socket.on("quiz_end", () => {
            setCurrentState("quiz_end");
        });


    }, []);
    if (currentState === "not_started") {
        return <div>
            This quiz hasnt started yet
        </div>
    }
    if (currentState === "question") {
        console.log(currentQuestion);
        return <Quizp socket={S} quizid={quizid} userid={userId} data={currentQuestion} counter={15} />
    };
    if (currentState === "leaderboard") {
        console.log(leaderboard);
        return <Leaderboard leaderboard={leaderboard} />
    };
    if (currentState === "quiz_end") {
        return <Result winner={leaderboard[0]} />
    }
}
