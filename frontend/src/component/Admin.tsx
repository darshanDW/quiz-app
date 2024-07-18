import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import CreateP from "./CreateP";
import { Control } from "./Contriol";
import "../App.css";
function Admin() {
    const [quiz, setQuiz] = useState("");
    const [a, seta] = useState("");
    const [S, setS] = useState<null | any>(null);

    useEffect(() => {
        const socket: Socket = io("https://quiz-app-xbs7.vercel.app");
        console.log(socket);
        setS(socket);
        console.log(S);
        socket.on("connect", () => {
            console.log("Connected to the server");
        });
        socket.emit("join-admin");

        socket.on("disconnect", () => {
            console.log("Disconnected from the server");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    if (!quiz) {
        return (
            <div className="admin-container">
                <input
                    className="admin-input-box"
                    type="text"
                    placeholder="code"
                    onChange={(e) => { seta(e.target.value) }} />
                <button
                    className="admin-button"
                    onClick={() => {
                        setQuiz(a);
                        if (S) {
                            console.log(a);
                            S.emit("create-quiz", { quiz: a });
                        }
                    }}
                >
                    Create quiz
                </button>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <CreateP quiz={quiz} socket={S} />
            <Control socket={S} quizid={quiz} />
        </div>
    );
}

export default Admin;
