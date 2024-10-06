
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Quizp } from "./Quiz";
import { Leaderboard } from "./Leaderboard";
import "./User.css"

import { Result } from "./Result";
const User = () => {

    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [code, setCode] = useState("");
    if (!submitted) {
        return <div className="user-container">
            <div >
                <div className="text-center">
                    <div className="Heading">
                        <h1 className="">
                            Enter the code to join

                            <p >It’s on the screen in front of you</p> </h1>
                    </div>
                    <div className="mb-8">
                        <input
                            className="input-feild"
                            placeholder="xyz"
                            style={{ fontSize: "1rem" }}
                            type="text"
                            onChange={(e) => {
                                setCode(e.target.value)
                            }}
                        />
                        <br /> <br />
                        <input
                            className="input-feild"
                            placeholder="Your name"
                            style={{ fontSize: "1rem" }}
                            type="text"
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                    </div>
                    <button
                        className="Join-button"
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


        const socket: Socket = io("https://quiz-app-6-ldua.onrender.com");
        setS(socket);

        socket.emit('join', { quizid, name });
        if (socket) { console.log(quizid, name); }

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
